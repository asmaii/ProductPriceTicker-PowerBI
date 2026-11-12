import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
declare class ContentCardSettings extends FormattingSettingsCard {
    showTitle: formattingSettings.ToggleSwitch;
    title: formattingSettings.TextInput;
    showSubtitle: formattingSettings.ToggleSwitch;
    subtitle: formattingSettings.TextInput;
    showProductName: formattingSettings.ToggleSwitch;
    showPrice: formattingSettings.ToggleSwitch;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
declare class ColorsCardSettings extends FormattingSettingsCard {
    backgroundColor: formattingSettings.ColorPicker;
    titleColor: formattingSettings.ColorPicker;
    subtitleColor: formattingSettings.ColorPicker;
    productNameColor: formattingSettings.ColorPicker;
    priceColor: formattingSettings.ColorPicker;
    separatorColor: formattingSettings.ColorPicker;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
declare class AnimationCardSettings extends FormattingSettingsCard {
    speed: formattingSettings.NumUpDown;
    reverseDirection: formattingSettings.ToggleSwitch;
    pauseOnHover: formattingSettings.ToggleSwitch;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
declare class TypographyCardSettings extends FormattingSettingsCard {
    titleFontSize: formattingSettings.NumUpDown;
    subtitleFontSize: formattingSettings.NumUpDown;
    productFontSize: formattingSettings.NumUpDown;
    priceFontSize: formattingSettings.NumUpDown;
    borderRadius: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class VisualFormattingSettingsModel extends FormattingSettingsModel {
    contentCard: ContentCardSettings;
    colorsCard: ColorsCardSettings;
    animationCard: AnimationCardSettings;
    typographyCard: TypographyCardSettings;
    cards: (ContentCardSettings | ColorsCardSettings | AnimationCardSettings | TypographyCardSettings)[];
}
export {};
