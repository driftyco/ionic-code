var common_1 = require('angular2/common');
var overlay_1 = require('../components/overlay/overlay');
var menu_1 = require('../components/menu/menu');
var menu_toggle_1 = require('../components/menu/menu-toggle');
var menu_close_1 = require('../components/menu/menu-close');
var badge_1 = require('../components/badge/badge');
var button_1 = require('../components/button/button');
var blur_1 = require('../components/blur/blur');
var content_1 = require('../components/content/content');
var scroll_1 = require('../components/scroll/scroll');
var pull_to_refresh_1 = require('../components/scroll/pull-to-refresh');
var slides_1 = require('../components/slides/slides');
var tabs_1 = require('../components/tabs/tabs');
var tab_1 = require('../components/tabs/tab');
var list_1 = require('../components/list/list');
var item_1 = require('../components/item/item');
var item_sliding_1 = require('../components/item/item-sliding');
var toolbar_1 = require('../components/toolbar/toolbar');
var icon_1 = require('../components/icon/icon');
var checkbox_1 = require('../components/checkbox/checkbox');
var select_1 = require('../components/select/select');
var option_1 = require('../components/option/option');
var toggle_1 = require('../components/toggle/toggle');
var input_1 = require('../components/input/input');
var label_1 = require('../components/label/label');
var segment_1 = require('../components/segment/segment');
var radio_button_1 = require('../components/radio/radio-button');
var radio_group_1 = require('../components/radio/radio-group');
var searchbar_1 = require('../components/searchbar/searchbar');
var nav_1 = require('../components/nav/nav');
var nav_push_1 = require('../components/nav/nav-push');
var nav_router_1 = require('../components/nav/nav-router');
var navbar_1 = require('../components/navbar/navbar');
var id_1 = require('../components/app/id');
var show_hide_when_1 = require('../components/show-hide-when/show-hide-when');
/**
 * @name IONIC_DIRECTIVES
 * @private
 * @description
 * The core Ionic directives as well as Angular's CORE_DIRECTIVES and
 * FORM_DIRECTIVES.  Automatically available in every [@Page](../Page/) template.
 *
 * **Angular**
 * - CORE_DIRECTIVES
 * - FORM_DIRECTIVES
 *
 * **Content**
 * -  Menu
 * -  MenuToggle
 * -  MenuClose
 *
 * -  Button
 * -  Blur
 * -  Content
 * -  Scroll
 * -  Refresher
 *
 * **Lists**
 * -  List
 * -  ListHeader
 * -  Item
 * -  ItemSliding
 *
 * **Slides**
 * -  Slides
 * -  Slide
 * -  SlideLazy
 *
 * **Tabs**
 * -  Tabs
 * -  Tab
 *
 * **Toolbar**
 * -  Toolbar
 * -  ToolbarTitle
 * -  ToolbarItem
 *
 * **Media**
 * -  Icon
 *
 * **Forms**
 * -  Searchbar
 * -  Segment
 * -  SegmentButton
 * -  Checkbox
 * -  RadioGroup
 * -  RadioButton
 * -  Select
 * -  Option
 * -  Toggle
 * -  TextInput
 * -  Label
 *
 * **Nav**
 * -  Nav
 * -  NavbarTemplate
 * -  Navbar
 * -  NavPush
 * -  NavPop
 * -  NavRouter
 * -  IdRef
 *
 * -  ShowWhen
 * -  HideWhen
 */
exports.IONIC_DIRECTIVES = [
    // Angular
    common_1.CORE_DIRECTIVES,
    common_1.FORM_DIRECTIVES,
    // Content
    overlay_1.OverlayNav,
    menu_1.Menu,
    menu_toggle_1.MenuToggle,
    menu_close_1.MenuClose,
    badge_1.Badge,
    button_1.Button,
    blur_1.Blur,
    content_1.Content,
    scroll_1.Scroll,
    pull_to_refresh_1.Refresher,
    // Lists
    list_1.List,
    list_1.ListHeader,
    item_1.Item,
    item_sliding_1.ItemSliding,
    // Slides
    slides_1.Slides,
    slides_1.Slide,
    slides_1.SlideLazy,
    // Tabs
    tabs_1.Tabs,
    tab_1.Tab,
    // Toolbar
    toolbar_1.Toolbar,
    toolbar_1.ToolbarTitle,
    toolbar_1.ToolbarItem,
    // Media
    icon_1.Icon,
    // Forms
    searchbar_1.Searchbar,
    searchbar_1.SearchbarInput,
    segment_1.Segment,
    segment_1.SegmentButton,
    checkbox_1.Checkbox,
    radio_group_1.RadioGroup,
    radio_button_1.RadioButton,
    select_1.Select,
    option_1.Option,
    toggle_1.Toggle,
    input_1.TextArea,
    input_1.TextInput,
    label_1.Label,
    // Nav
    nav_1.Nav,
    navbar_1.NavbarTemplate,
    navbar_1.Navbar,
    nav_push_1.NavPush,
    nav_push_1.NavPop,
    nav_router_1.NavRouter,
    id_1.IdRef,
    show_hide_when_1.ShowWhen,
    show_hide_when_1.HideWhen
];
