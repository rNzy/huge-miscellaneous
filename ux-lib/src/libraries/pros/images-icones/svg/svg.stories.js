import './svg.component.js';

export default {
  title: 'Components|Svg',
  component: 'ux-svg',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const size = () => `
<ux-svg icon="connexion" lib-size="sm"></ux-svg>
<ux-svg icon="connexion" lib-size="md"></ux-svg>
<ux-svg icon="connexion" lib-size="lg"></ux-svg>
<ux-svg icon="connexion" lib-size="xl"></ux-svg>
<ux-svg icon="connexion" lib-size="xxl"></ux-svg>
`;

export const addCircle = () => `
<ux-svg icon="arrow" circle></ux-svg>
`;

export const rotate = () => `
<ux-svg icon="arrow" rotate="30"></ux-svg>
`;

export const addShadow = () => `
<ux-svg icon="arrow" shadow></ux-svg>
`;

export const allIcons = () => {
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
        <tr>
            <td>Name</td>
            <td>Icon</td>
        </tr>
    </thead>
    <tbody class="tbody">
    </tbody>
  `;

  const tbody = table.querySelector('.tbody');

  setTimeout(() => {
    const svg = document.getElementById('uxlibsvg');
    let row = '';
    if (svg && svg.children && svg.children[0] && svg.children[0].children) {
      [...svg.children[0].children].forEach(icon => {
        row += `
      <tr>
        <td>${icon.id}</td>
        <td style="font-size:35px;"><ux-svg icon="${icon.id}"></ux-svg></td>
      </tr>
    `;
      });
      tbody.innerHTML = row;
    }
  }, 1000);

  return table;
};
