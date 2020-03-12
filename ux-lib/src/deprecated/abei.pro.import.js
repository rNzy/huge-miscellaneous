/**
 * @description Loading every components, wich load their own SCSS
 */

// Atoms
import './app/components/atoms/bux-accordeon-item/accordeon-item.component';
import './app/components/atoms/bux-amount/amount.component';
import './app/components/atoms/bux-back-link/back-link.component';
import './app/components/atoms/bux-badge/badge.component';
import './app/components/atoms/bux-big-heading/big-heading.component';
import './app/components/atoms/bux-big-input/big-input.component';
import './app/components/atoms/bux-block/block.component';
import './app/components/atoms/bux-btn/btn.component';
import './app/components/atoms/bux-bulle-block/bulle-block.component';
import './app/components/atoms/bux-card/card.component';
import './app/components/atoms/bux-card-header/card-header.component';
import './app/components/atoms/bux-card-body/card-body.component';
import './app/components/atoms/bux-card-footer/card-footer.component';
import './app/components/atoms/bux-chat/chat.component';
import './app/components/atoms/bux-checkbox/checkbox.component';
import './app/components/atoms/bux-cnil/cnil.component';
import './app/components/atoms/bux-container/container.component';
import './app/components/atoms/bux-footer-app/footer-app.component';
import './app/components/atoms/bux-heading/heading.component';
import './app/components/atoms/bux-input/input.component';
import './app/components/atoms/bux-link-tile/link-tile.component';
import './app/components/atoms/bux-list/list.component';
import './app/components/atoms/bux-loader/loader.component';
import './app/components/atoms/bux-message/message.component';
import './app/components/atoms/bux-nav-bar/nav-bar.component';
import './app/components/atoms/bux-nav-bar-item/nav-bar-item.component';
import './app/components/atoms/bux-progress-bar/progress-bar.component';
import './app/components/atoms/bux-progress-ring/progress-ring.component';
import './app/components/atoms/bux-radio-button/radio-button.component';
import './app/components/atoms/bux-range/range.component';
import './app/components/atoms/bux-row/row.component';
import './app/components/atoms/bux-row-edit/row-edit.component';
import './app/components/atoms/bux-row-simple/row-simple.component';
import './app/components/atoms/bux-select/select.component';
import './app/components/atoms/bux-shortlink/shortlink.component';
import './app/components/atoms/bux-step/step.component';
import './app/components/atoms/bux-svg/svg.component';
import './app/components/atoms/bux-table/table.component';
import './app/components/atoms/bux-tabs/tabs.component';
import './app/components/atoms/bux-text/text.component';

// Molecules
import './app/components/molecules/bux-accordeon/accordeon.component';
import './app/components/molecules/bux-account-info/account-info.component';
import './app/components/molecules/bux-account-tile/account-tile.component';
import './app/components/molecules/bux-btn-group/btn-group.component';
import './app/components/molecules/bux-card-information/card-information.component';
import './app/components/molecules/bux-checkbox-group/checkbox-group.component';
import './app/components/molecules/bux-datatable/datatable.component';
import './app/components/molecules/bux-datatable-head/datatable-head.component';
import './app/components/molecules/bux-datatable-row/datatable-row.component';
import './app/components/molecules/bux-file-download/file-download.component';
import './app/components/molecules/bux-footer/footer.component';
import './app/components/molecules/bux-header/header-abei.component';
import './app/components/molecules/bux-modal/modal.component';
import './app/components/molecules/bux-progress-reserve/progress-reserve.component';
import './app/components/molecules/bux-radio-group/radio-group.component';
import './app/components/molecules/bux-range-select/range-select.component';
import './app/components/molecules/bux-sadsmiley-error/sadsmiley-error.component';
import './app/components/molecules/bux-skip-nav/skip-nav.component';
import './app/components/molecules/bux-steps/steps.component';
import './app/components/molecules/bux-user-card/user-card.component';
import './app/components/molecules/bux-widget/widget.component';

// // Organisms

// // Pages
import './app/components/pages/authentification/index';
import './app/components/pages/bux-sitemap/sitemap.component';
import './app/components/pages/end-process/end-process.component';

// Temporairement définitif
// @todo déplacer dans les modules styles legacy
import './app/components/pages/legacy/index';

// V2
///////////////////////////////////////////

// 01-Atoms

// a garder maintenant que l'on a bux-text avec plein de mixin ? a changer data-size et data-color
import './app/components-v2/01-atoms/bux-font/font.component';
// probleme shadow dom router et conversion mixin ?
import './app/components-v2/01-atoms/bux-link/link.component';

// 02-Molecules
import './app/components-v2/02-molecules/bux-row/row.component';
import './app/components-v2/02-molecules/bux-shortlink/shortlink.component';

// V3
////////////////////////////////////////

// 01 - Atoms;
import './app/components-v3/01-atoms/bux-amount/amount.component';
import './app/components-v3/01-atoms/bux-btn/cmx/btn.component';
import './app/components-v3/01-atoms/bux-checkbox/cmx/checkbox.component';
import './app/components-v3/01-atoms/bux-checkbox/cmx/checkbox-group.component';
import './app/components-v3/01-atoms/bux-image/image.component';
import './app/components-v3/01-atoms/bux-input/input.component';
import './app/components-v3/01-atoms/bux-label/label.component';
import './app/components-v3/01-atoms/bux-overlay/overlay.component';
import './app/components-v3/01-atoms/bux-notification/cmx/notification.component';
import './app/components-v3/01-atoms/bux-progressbar/progressBar.component';
import './app/components-v3/01-atoms/bux-radio-btn/cmx/radio-button.component';
import './app/components-v3/01-atoms/bux-radio-btn/cmx/radio-group.component';
// import './app/components-v3/01-atoms/bux-select/select.component';
// import './app/components-v3/01-atoms/bux-select/options.component';
import './app/components-v3/01-atoms/bux-svg/svg.component';
import './app/components-v3/01-atoms/bux-tel/tel.component';
import './app/components-v3/01-atoms/bux-text/text.component';
import './app/components-v3/01-atoms/bux-trigger-modal/trigger-modal.component';
import './app/components-v3/01-atoms/bux-layout-flex/layout-flex.component';
import './app/components-v3/01-atoms/bux-layout/layout.component';

// 02-Molecules
import './app/components-v3/02-molecules/bux-accordion/accordion.component';
import './app/components-v3/02-molecules/bux-accordion/accordion-item.component';
import './app/components-v3/02-molecules/bux-btn-group/cmx/btn-group.component';
import './app/components-v3/02-molecules/bux-card/cmx/card.component';
import './app/components-v3/02-molecules/bux-card/cmx/card-header.component';
import './app/components-v3/02-molecules/bux-card/cmx/card-body.component';
import './app/components-v3/02-molecules/bux-card/cmx/card-footer.component';
import './app/components-v3/02-molecules/bux-card/card-tile.component';
import './app/components-v3/02-molecules/bux-card/card-bar.component';
import './app/components-v3/02-molecules/bux-card/card-scroller.component';
import './app/components-v3/02-molecules/bux-datatable/datatable.component';
import './app/components-v3/02-molecules/bux-datatable/datatable-head.component';
import './app/components-v3/02-molecules/bux-datatable/datatable-row.component';
import './app/components-v3/02-molecules/bux-datalisting/datalisting.component';
import './app/components-v3/02-molecules/bux-datalisting/datalisting-head.component';
import './app/components-v3/02-molecules/bux-datalisting/datalisting-row.component';
import './app/components-v3/02-molecules/bux-heading/heading.component';
import './app/components-v3/02-molecules/bux-input-w-label/input-w-label.component';
import './app/components-v3/02-molecules/bux-key-value-item/key-value-item.component';
import './app/components-v3/02-molecules/bux-key-value-item/key-value-edit-item.component';
import './app/components-v3/02-molecules/bux-list/list.component';
import './app/components-v3/02-molecules/bux-message/message-base.component';
import './app/components-v3/02-molecules/bux-steps/steps.component';
import './app/components-v3/02-molecules/bux-row-icon/row-icon.component';
import './app/components-v3/02-molecules/bux-steps/step-item.component';
import './app/components-v3/02-molecules/bux-modal/modal.component';
import './app/components-v3/02-molecules/bux-modal/modal-header.component';
import './app/components-v3/02-molecules/bux-modal/modal-body.component';
import './app/components-v3/02-molecules/bux-modal/modal-footer.component';
// A modifier le label par un slot plutot qu'un attribut
import './app/components-v3/02-molecules/bux-disclosure/disclosure.component';

// 03-Organisms
import './app/components-v3/03-organisms/bux-app-footer/app-footer.component';
import './app/components-v3/03-organisms/bux-bulle/bulle.component';
import './app/components-v3/03-organisms/bux-dualpanel/dualpanel.component';
import './app/components-v3/03-organisms/bux-frame/frame.component';
import './app/components-v3/03-organisms/bux-key-value/key-value.component';
import './app/components-v3/03-organisms/bux-section/section.component';
import './app/components-v3/03-organisms/bux-slider/slider.component';
import './app/components-v3/03-organisms/bux-shortcut/cmx/shortcut.component';
import './app/components-v3/03-organisms/bux-wmax-center/wmax-center.component';

// 04-Templates
import './app/components-v3/04-templates/bux-endprocess/endprocess.component';
import './app/components-v3/04-templates/widget-account/widget-account.component';
import './app/components-v3/04-templates/widget-card/widget-card.component';
import './app/components-v3/04-templates/widget-conseiller/widget-conseiller.component';
