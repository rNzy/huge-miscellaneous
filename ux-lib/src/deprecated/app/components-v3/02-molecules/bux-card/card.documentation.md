# bux2-card

A container flex space-between displayed with white background and border 1px solid #dedede.

3 slots : "card-header", "card-body", "card-footer".

## Properties

Properties and attributes specific to this component:

| Properties | Type      | Default | Description                    |
| :--------- | :-------  | :------ | :----------------------------- |
| noborder   | `boolean` | false   |                                |

## Properties and attributes for sub-components:

### bux2-card-header

A flex container center aligned and justified with padding.

AZB : left aligned with background color.

| Properties | Type      | Default | Description                    |
| :--------- | :-------  | :------ | :----------------------------- |
|            |           |         |                                |

### bux2-card-subheader

AZB : a flex container left aligned with padding and background color.

| Properties | Type      | Default | Description                    |
| :--------- | :-------  | :------ | :----------------------------- |
|            |           |         |                                |

### bux2-card-body

A container with horizontal padding.

AZB : vertical padding too.

Properties and attributes from mixin extended by this component:

| Properties | Type          | Default | Description                            |
| :--------- | :------------ | :------ | :----------                            |
| background | `boolean`     | false   |                                        |
| space-v    | `string`      | md      | xs sm md lg xl                         |
| space-h    | `string`      | md      | xs sm md lg xl                         |
| space-all  | `boolean`     | false   | combined only with space-v or space-h  |

### bux2-card-bar

A center aligned container flex space-around displayed.

| Properties | Type      | Default | Description                                     |
| :--------- | :-------  | :------ | :-----------------------------                  |
| border-top | `boolean` | false   | Add a padding-top                               |
| center     | `boolean` | false   | Change justify-content: space-around to center  |

Properties and attributes from mixin extended by this component:

| Properties     | Type          | Default | Description                 |
| :---------     | :------------ | :------ | :----------                 |
| border-top     | `boolean`     | false   |                             |
| border-bottom  | `boolean`     | false   |                             |
| border-right   | `boolean`     | false   |                             |
| border-left    | `boolean`     | false   |                             |
| space-h        | `string`      | md      | xs sm md lg xl              |
| space-all      | `boolean`     | false   | combined only with space-h  |

### bux2-card-scroller

A flex container center justified.

Properties and attributes from mixin extended by this component:

| Properties | Type          | Default | Description        |
| :--------- | :------------ | :------ | :----------        |
| is-mobile  | `boolean`     | false   | Display on mobile  |
| is-desktop | `boolean`     | false   | Display on desktop |

### bux2-card-tile

A flex container center aligned and justified.

| Properties | Type      | Default | Description                    |
| :--------- | :-------  | :------ | :----------------------------- |
|            |           |         |                                |

### bux2-card-footer

A container with padding.

| Properties | Type      | Default | Description                    |
| :--------- | :-------  | :------ | :----------------------------- |
|            |           |         |                                |

## Utilisation

```html
<bux2-card>
  <bux2-card-header slot="card-header">Header</bux2-card-header>
  <bux2-card-subheader slot="card-header">Subheader</bux2-card-subheader>
  <bux2-card-body slot="card-body">
    Body
    <bux2-card-tile slot="card-body">Tile</bux2-card-tile>
  </bux2-card-body>
  <bux2-card-bar slot="card-body"><span>Bar item 1</span><span>Bar item 2</span><span>Bar item 3</span></bux2-card-bar>
  <bux2-card-scroller slot="card-body">Scroller</bux2-card-scroller>
  <bux2-card-footer slot="card-footer">Footer</bux2-card-footer>
</bux2-card>
```
