#!/usr/bin/python3
# coding: utf-8
import os
import re

# component type set
componentTypeList = set(["atoms", "molecules", "pages"])

# Path of this file
basePath = os.path.dirname(os.path.realpath(__file__))

# Init global var
componentName = ''
componentTag = ''
componentType = ''
componentPath = ''
className = ''

componentFileName = ''
componentDocFileName = ''
componentTestFileName = ''
componentStoryFileName = ''
componentStylesFileName = ''

testHtmlFilePath = ''

# Print in color
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def makeClassName(componentName):
  tmp = list(map(lambda x: x[0].upper() + x[1:], componentName.split('-')))
  return ''.join(tmp)

def askName():
  global componentName
  global className
  global componentTag
  global componentFileName
  global componentDocFileName
  global componentTestFileName
  global componentStoryFileName
  global componentStylesFileName
  componentName = input("Component Name (without bux !!) : ")
  while not componentName:
    print(bcolors.WARNING +
      "Error: No empty name ! Try again"
      + bcolors.ENDC)
    init()
    componentName = input("Component Name (without bux !!) : ")
  className = makeClassName(componentName)
  componentTag = 'bux-' + componentName
  componentFileName = componentName + '.component.js'
  componentDocFileName = componentName + '.documentation.md'
  componentTestFileName = componentName + '.spec.html'
  componentStoryFileName = componentName + '.stories.js'
  componentStylesFileName = componentName + '.styles.scss'

def askType():
  global componentType
  global componentPath
  componentType = input("Component Type (atoms, molecules, pages): ")
  while not componentType in componentTypeList:
    print(bcolors.WARNING +
      "Error: Bad type ! Try again"
      + bcolors.ENDC)
    componentType = input("Component Type (atoms, molecules, pages): ")
  componentPath = basePath + '/src/app/components/' + componentType + '/' + componentTag

def createDir():
  "This fonction create the directory"
  if not os.path.exists(componentPath):
    os.makedirs(componentPath)

def writeComponent():
  "This fonction write the .component.js file"
  tpl = """\

import BuxClass from '../../../../bux.class';

import './{componentStylesFileName}';

customElements.define(
  '{componentTag}',
  class {className} extends BuxClass {{

    constructor() {{
      super();
      this.isInit = false;
    }}

    //////////////// Attribute change
    static get observedAttributes() {{
      return ['data-value'];
    }}

    attributeChangedCallback(name, oldVal, newVal) {{
      const camelName = this.toCamelCase(name);
      this[camelName] = newVal;

      if (!this.isInit) return;

      switch (name) {{
        case 'data-value':
          // Do something with the new value
          // But use this_value not this.value
          break;
      }}
    }}

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {{
      // Do call it again if is was already init
      if (this.isInit) return;
      this.isInit = true;
      
      // Init attribut
      // Call this function for every
      // Observed value
      this.value = this.getAttribute('data-value') || '';

      // Exemple for true, false attribute
      // this.disabled =
      //      this.hasAttribute('disabled') &&
      //      this.getAttribute('disabled') !== 'false';

      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      // Here you can select element
      // this.wrapSlot = tpl.content.querySelector('div');

      // Insert slot in previous selected element
      // while (this.childNodes.length > 0) {{
      //   this.wrapSlot.appendChild(this.childNodes[0]);
      // }}

      // Insert your element in the dom
      this.appendChild(tpl.content);
    }}

    ////////////////// Helper
    template() {{
      return `
        <div>
        </div>
      `;
    }}
  }}
);
""".format(
  componentStylesFileName = componentStylesFileName,
  componentTag = componentTag,
  className = className
  )
  fPath = componentPath + '/' + componentFileName
  fFile = open(fPath, 'w')
  fFile.write(tpl)
  fFile.close()
  return

def writeDocFile():
  tpl = """\
# Composant {componentTag}

Ce composant est défini par des attributs :

| Properties      | Type      | Default | Description                                                  |
| :-------------- | :-------- | :------ | :----------------------------------------------------------- |
| data-value      | `string`  | ''      | défini la valeur de l'élément                                |

## Exemple :

```html
<!-- Notre composant {componentTag} -->
<{componentTag}>
</{componentTag}>
```
""".format(componentTag = componentTag)
  fPath = componentPath + '/' + componentDocFileName
  fFile = open(fPath, 'w')
  fFile.write(tpl)
  fFile.close()
  return

def writeTestFile():
  tpl = """\
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <script src="/node_modules/web-component-tester/browser.js"></script>
    <title>Test {componentName}</title>
</head>
<body>
    <test-fixture id="componentFixture">
        <template>
                <{componentTag}>
                </{componentTag}>
        </template>
    </test-fixture>
    <script>
        suite('<{componentTag}>', () => {{
            let component;
            let myEl;
            setup(() => {{
                component = fixture('componentFixture');
                // Select like this
                // myEl = component.querySelector('div');
            }});

            test('CHANGE THIS. WRITE TEST !!!!', () => {{
                assert.isTrue(false);
            }});
        }});
    </script>
</body>
</html>
""".format(
  componentFileName = componentFileName,
  componentName = componentName,
  componentTag = componentTag
  )
  fPath = componentPath + '/' + componentTestFileName
  fFile = open(fPath, 'w')
  fFile.write(tpl)
  fFile.close()
  return

def writeStoryFile():
  componentTypeCap = componentType.capitalize()
  componentNameCap = componentName.capitalize()
  print("component Name : " + componentTypeCap)
  tpl = """\
import {{ storiesOf }} from '@storybook/polymer';
import {{ withReadme }} from 'storybook-readme';
import {{ withKnobs, text, select, boolean, number }} from '@storybook/addon-knobs/polymer';

import './{componentFileName}';
import md from './{componentDocFileName}';

storiesOf('{componentTypeCap}/{componentNameCap}', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
        `
          <{componentTag}
            select="${{select('select', ['nodata', 'valid', 'error'])}}"
            boolean="${{boolean('required', false)}}"
            text="${{text('text', 'Mon texte')}}"
            number="${{number('number', 100)}}"
          >
          </{componentTag}>
        `
    );
""".format(
  componentFileName = componentFileName,
  componentDocFileName = componentDocFileName,
  componentType = componentType,
  componentTag = componentTag,
  componentNameCap = componentNameCap,
  componentTypeCap = componentTypeCap
  )
  fPath = componentPath + '/' + componentStoryFileName
  fFile = open(fPath, 'w')
  fFile.write(tpl)
  fFile.close()
  return

def writeCSS():
  tpl = """\
/* ==========================================================================
   LAYER / #{componentStylesFileName}
   ========================================================================== */

// Settings
$class-color: red;

/* Heading
  =========================================== */

/* Sub-heading
  ---------------------------------- */

/**
 * Long-form comment.
 *
 * 1. Provide line-comments like this.
 */
.c-{componentName} {{
  color: $class-color; /* [1] */


  @include mq($from: medium) {{

  }}
}}
""".format(componentStylesFileName = componentStylesFileName, componentName = componentName)
  fPath = componentPath + '/' + componentStylesFileName
  fFile = open(fPath, 'w')
  fFile.write(tpl)
  fFile.close()
  return

def writeInTestHtmlFile():
  "This fonction write the new composent in the test.html file"
  global testHtmlFilePath
  testHtmlFilePath = basePath + '/test/index.html'
  testhtml = open(testHtmlFilePath, 'r')
  data = testhtml.read()
  #m = re.search('WCT\.loadSuites\([\s\S]+\[[\s]+(\"[\s\S]+\")[\s\S]+\)', data)
  #group1 = m.group(1)
  #arr = ''.join(m.group(1).split()).split(',')
  #path = '"../' + os.path.relpath(componentPath) + '/' + componentTestFileName + '"'
  #arr.append(path)
  #@todo write in file

def printData():
  print("component Name : " + componentName)
  print("component Type : " + componentType)
  print("component Tag : " + componentTag)
  print("component Path : " + componentPath)
  print("component File name : " + componentFileName)
  print("component Doc file name : " + componentDocFileName)
  print("component Styles file name : " + componentStylesFileName)
  print("component Test file name : " + componentTestFileName)
  print("component Story file name : " + componentStoryFileName)
  print("component ClassName : " + className)

def init():
  askName()
  askType()
  while os.path.exists(componentPath):
    print(componentPath)
    print(bcolors.WARNING +
      "Error: Component already exist ! Try again"
      + bcolors.ENDC)
    askName()
    askType()
  createDir()


init()
printData()
writeComponent()
writeDocFile()
writeTestFile()
writeStoryFile()
writeCSS()

print("""{OKGREEN}
Don't forget to add your component in test and index
for each EFS :
- in src/index_EFS.js
- in test/EFS/index.js
{ENDC}""".format(OKGREEN = bcolors.OKGREEN, ENDC = bcolors.ENDC, testHtmlFilePath=testHtmlFilePath )
)
