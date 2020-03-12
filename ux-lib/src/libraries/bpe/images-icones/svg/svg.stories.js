import './svg.component.js';

export default {
  title: 'Components|Svg',
  component: 'ux-svg',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const size = () => `
<ux-svg icon="warning" lib-size="sm"></ux-svg>
<ux-svg icon="warning" lib-size="md"></ux-svg>
<ux-svg icon="warning" lib-size="lg"></ux-svg>
<ux-svg icon="warning" lib-size="xl"></ux-svg>
`;

export const rotate = () => `
<ux-svg icon="check" rotate="30"></ux-svg>
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
