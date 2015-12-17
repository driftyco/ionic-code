import { Provider } from 'angular2/core';
import { IonicApp } from '../components/app/app';
import { OverlayController } from '../components/overlay/overlay-controller';
import { Form } from '../util/form';
import { Keyboard } from '../util/keyboard';
import { ActionSheet } from '../components/action-sheet/action-sheet';
import { Translate } from '../translation/translate';
import { TapClick } from '../components/tap-click/tap-click';
/**
 * @private
 */
export declare function ionicProviders(args?: {}): (typeof IonicApp | Provider | typeof TapClick | typeof Form | typeof Keyboard | typeof OverlayController | typeof ActionSheet | typeof Translate | any[])[];
