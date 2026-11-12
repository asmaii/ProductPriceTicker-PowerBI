"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

// CONTENT SETTINGS
class ContentCardSettings extends FormattingSettingsCard {
  showTitle = new formattingSettings.ToggleSwitch({
    name: "showTitle",
    displayName: "Show title",
    value: true,
  });

  title = new formattingSettings.TextInput({
    name: "title",
    displayName: "Title",
    value: "PRODUCT PRICE TICKER",
    placeholder: "PRODUCT PRICE TICKER",
  });

  showSubtitle = new formattingSettings.ToggleSwitch({
    name: "showSubtitle",
    displayName: "Show subtitle",
    value: true,
  });

  subtitle = new formattingSettings.TextInput({
    name: "subtitle",
    displayName: "Subtitle",
    value: "Discover our products and prices",
    placeholder: "Discover our products and prices",
  });

  showProductName = new formattingSettings.ToggleSwitch({
    name: "showProductName",
    displayName: "Show product name",
    value: true,
  });

  showPrice = new formattingSettings.ToggleSwitch({
    name: "showPrice",
    displayName: "Show price",
    value: true,
  });

  name = "content";
  displayName = "Content";

  slices: Array<FormattingSettingsSlice> = [
    this.showTitle,
    this.title,
    this.showSubtitle,
    this.subtitle,
    this.showProductName,
    this.showPrice,
  ];
}

// COLOR SETTINGS
class ColorsCardSettings extends FormattingSettingsCard {
  backgroundColor = new formattingSettings.ColorPicker({
    name: "backgroundColor",
    displayName: "Background color",
    value: { value: "#111827" },
  });

  titleColor = new formattingSettings.ColorPicker({
    name: "titleColor",
    displayName: "Title color",
    value: { value: "#FFFFFF" },
  });

  subtitleColor = new formattingSettings.ColorPicker({
    name: "subtitleColor",
    displayName: "Subtitle color",
    value: { value: "#CBD5E1" },
  });

  productNameColor = new formattingSettings.ColorPicker({
    name: "productNameColor",
    displayName: "Product name color",
    value: { value: "#FFFFFF" },
  });

  priceColor = new formattingSettings.ColorPicker({
    name: "priceColor",
    displayName: "Price color",
    value: { value: "#4ADE80" },
  });

  separatorColor = new formattingSettings.ColorPicker({
    name: "separatorColor",
    displayName: "Separator color",
    value: { value: "#64748B" },
  });

  name = "colors";
  displayName = "Colors";

  slices: Array<FormattingSettingsSlice> = [
    this.backgroundColor,
    this.titleColor,
    this.subtitleColor,
    this.productNameColor,
    this.priceColor,
    this.separatorColor,
  ];
}

// ANIMATION SETTINGS
class AnimationCardSettings extends FormattingSettingsCard {
  speed = new formattingSettings.NumUpDown({
    name: "speed",
    displayName: "Scrolling speed (px/s)",
    value: 60,
  });

  reverseDirection = new formattingSettings.ToggleSwitch({
    name: "reverseDirection",
    displayName: "Reverse direction",
    value: false,
  });

  pauseOnHover = new formattingSettings.ToggleSwitch({
    name: "pauseOnHover",
    displayName: "Pause on hover",
    value: true,
  });

  name = "animation";
  displayName = "Animation";

  slices: Array<FormattingSettingsSlice> = [this.speed, this.reverseDirection, this.pauseOnHover];
}

// TYPOGRAPHY SETTINGS
class TypographyCardSettings extends FormattingSettingsCard {
  titleFontSize = new formattingSettings.NumUpDown({
    name: "titleFontSize",
    displayName: "Title font size",
    value: 18,
    options: {
      minValue: { type: powerbi.visuals.ValidatorType.Min, value: 8 },
      maxValue: { type: powerbi.visuals.ValidatorType.Max, value: 48 },
    },
  });

  subtitleFontSize = new formattingSettings.NumUpDown({
    name: "subtitleFontSize",
    displayName: "Subtitle font size",
    value: 12,
    options: {
      minValue: { type: powerbi.visuals.ValidatorType.Min, value: 8 },
      maxValue: { type: powerbi.visuals.ValidatorType.Max, value: 32 },
    },
  });

  productFontSize = new formattingSettings.NumUpDown({
    name: "productFontSize",
    displayName: "Product name font size",
    value: 15,
    options: {
      minValue: { type: powerbi.visuals.ValidatorType.Min, value: 8 },
      maxValue: { type: powerbi.visuals.ValidatorType.Max, value: 36 },
    },
  });

  priceFontSize = new formattingSettings.NumUpDown({
    name: "priceFontSize",
    displayName: "Price font size",
    value: 15,
    options: {
      minValue: { type: powerbi.visuals.ValidatorType.Min, value: 8 },
      maxValue: { type: powerbi.visuals.ValidatorType.Max, value: 36 },
    },
  });

  borderRadius = new formattingSettings.NumUpDown({
    name: "borderRadius",
    displayName: "Border radius",
    value: 8,
    options: {
      minValue: { type: powerbi.visuals.ValidatorType.Min, value: 0 },
      maxValue: { type: powerbi.visuals.ValidatorType.Max, value: 50 },
    },
  });

  name = "typography";
  displayName = "Typography";

  slices: Array<FormattingSettingsSlice> = [
    this.titleFontSize,
    this.subtitleFontSize,
    this.productFontSize,
    this.priceFontSize,
    this.borderRadius,
  ];
}

// MAIN FORMATTING MODEL
export class VisualFormattingSettingsModel extends FormattingSettingsModel {
  contentCard = new ContentCardSettings();
  colorsCard = new ColorsCardSettings();
  animationCard = new AnimationCardSettings();
  typographyCard = new TypographyCardSettings();

  cards = [this.contentCard, this.colorsCard, this.animationCard, this.typographyCard];
}
