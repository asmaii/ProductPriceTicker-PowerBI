"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualEventService = powerbi.extensibility.IVisualEventService;

import { VisualFormattingSettingsModel } from "./settings";

interface Product {
  name: string;
  price: string;
}

export class Visual implements IVisual {
  private target: HTMLElement;
  private events: IVisualEventService;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;

  private container: HTMLElement;
  private header: HTMLElement;
  private titleElement: HTMLElement;
  private subtitleElement: HTMLElement;
  private viewport: HTMLElement;
  private track: HTMLElement;

  private animationFrame: number | undefined;
  private position: number = 0;
  private previousTime: number = 0;
  private groupWidth: number = 0;
  private paused: boolean = false;
  private resizeObserver: ResizeObserver;

  private speed: number = 60;
  private reverseDirection: boolean = false;
  private pauseOnHover: boolean = true;

  constructor(options: VisualConstructorOptions) {
    this.target = options.element;
    this.events = options.host.eventService;

    this.formattingSettingsService = new FormattingSettingsService();
    this.formattingSettings = new VisualFormattingSettingsModel();

    this.container = document.createElement("div");
    this.container.className = "marquee-container";

    this.header = document.createElement("div");
    this.header.className = "marquee-header";

    this.titleElement = document.createElement("div");
    this.titleElement.className = "marquee-title";

    this.subtitleElement = document.createElement("div");
    this.subtitleElement.className = "marquee-subtitle";

    this.header.appendChild(this.titleElement);
    this.header.appendChild(this.subtitleElement);

    this.viewport = document.createElement("div");
    this.viewport.className = "marquee-viewport";

    this.track = document.createElement("div");
    this.track.className = "marquee-track";

    this.viewport.appendChild(this.track);

    this.container.appendChild(this.header);
    this.container.appendChild(this.viewport);

    this.target.appendChild(this.container);

    this.container.addEventListener("mouseenter", () => {
      if (this.pauseOnHover) {
        this.paused = true;
      }
    });

    this.container.addEventListener("mouseleave", () => {
      this.paused = false;
    });

    this.resizeObserver = new ResizeObserver(() => {
      this.measure();
    });

    this.resizeObserver.observe(this.container);
  }

  public update(options: VisualUpdateOptions): void {
    this.events.renderingStarted(options);

    try {
      const dataView = options.dataViews?.[0];

      if (dataView) {
        this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(
          VisualFormattingSettingsModel,
          dataView,
        );
      }

      this.applyFormattingSettings();

      if (this.animationFrame !== undefined) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = undefined;
      }

      this.position = 0;
      this.previousTime = 0;
      this.track.replaceChildren();

      const categorical = dataView?.categorical;

      const categoryColumn = categorical?.categories?.[0];
      const priceColumn = categorical?.values?.[0];

      if (!categoryColumn || !priceColumn) {
        this.showMessage("Add Product Name and Product Price");
        this.events.renderingFinished(options);
        return;
      }

      const products: Product[] = [];

      categoryColumn.values.forEach((name, index) => {
        const price = priceColumn.values[index];

        if (name !== null && name !== undefined && price !== null && price !== undefined) {
          products.push({
            name: String(name),
            price:
              Number(price).toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }) + " TND",
          });
        }
      });

      if (products.length === 0) {
        this.showMessage("No product data available");
        this.events.renderingFinished(options);
        return;
      }

      const group = this.createGroup(products);

      this.track.appendChild(group);

      this.groupWidth = group.getBoundingClientRect().width;

      if (this.groupWidth > 0) {
        while (this.track.scrollWidth < this.viewport.clientWidth + this.groupWidth) {
          const clone = group.cloneNode(true) as HTMLElement;
          clone.setAttribute("aria-hidden", "true");
          this.track.appendChild(clone);
        }
      }

      this.position = this.reverseDirection ? -this.groupWidth : 0;

      this.measure();
      this.animate();

      this.events.renderingFinished(options);
    } catch (error) {
      this.events.renderingFailed(options, String(error));
    }
  }

  private applyFormattingSettings(): void {
    const content = this.formattingSettings.contentCard;
    const colors = this.formattingSettings.colorsCard;
    const animation = this.formattingSettings.animationCard;
    const typography = this.formattingSettings.typographyCard;

    this.titleElement.textContent = content.title.value;
    this.subtitleElement.textContent = content.subtitle.value;

    this.titleElement.style.display = content.showTitle.value ? "block" : "none";

    this.subtitleElement.style.display = content.showSubtitle.value ? "block" : "none";

    this.header.style.display =
      content.showTitle.value || content.showSubtitle.value ? "flex" : "none";

    this.container.style.backgroundColor = colors.backgroundColor.value.value;

    this.container.style.borderRadius = `${typography.borderRadius.value}px`;

    this.titleElement.style.color = colors.titleColor.value.value;

    this.subtitleElement.style.color = colors.subtitleColor.value.value;

    this.titleElement.style.fontSize = `${typography.titleFontSize.value}px`;

    this.subtitleElement.style.fontSize = `${typography.subtitleFontSize.value}px`;

    this.container.style.setProperty("--product-name-color", colors.productNameColor.value.value);

    this.container.style.setProperty("--price-color", colors.priceColor.value.value);

    this.container.style.setProperty("--separator-color", colors.separatorColor.value.value);

    this.container.style.setProperty(
      "--product-font-size",
      `${typography.productFontSize.value}px`,
    );

    this.container.style.setProperty("--price-font-size", `${typography.priceFontSize.value}px`);

    this.container.style.setProperty(
      "--show-product-name",
      content.showProductName.value ? "inline" : "none",
    );

    this.container.style.setProperty("--show-price", content.showPrice.value ? "inline" : "none");

    this.speed = Math.max(0, Math.min(500, animation.speed.value));
    this.reverseDirection = animation.reverseDirection.value;
    this.pauseOnHover = animation.pauseOnHover.value;
  }

  private createGroup(products: Product[]): HTMLElement {
    const group = document.createElement("div");
    group.className = "marquee-group";

    products.forEach((product, index) => {
      const item = document.createElement("div");
      item.className = "product-item";

      const name = document.createElement("span");
      name.className = "product-name";
      name.textContent = product.name;

      const price = document.createElement("span");
      price.className = "product-price";
      price.textContent = product.price;

      name.style.display = this.formattingSettings.contentCard.showProductName.value
        ? "inline"
        : "none";

      price.style.display = this.formattingSettings.contentCard.showPrice.value ? "inline" : "none";

      item.appendChild(name);
      item.appendChild(price);

      group.appendChild(item);

      if (index !== products.length - 1) {
        const separator = document.createElement("span");
        separator.className = "product-separator";
        separator.textContent = "✦";
        group.appendChild(separator);
      }
    });

    return group;
  }

  private showMessage(message: string): void {
    const text = document.createElement("div");
    text.className = "marquee-message";
    text.textContent = message;

    this.track.appendChild(text);
  }

  private measure(): void {
    const group = this.track.querySelector(".marquee-group");

    if (group) {
      this.groupWidth = group.getBoundingClientRect().width;
    }
  }

  private animate = (time?: number): void => {
    if (time === undefined) {
      this.animationFrame = requestAnimationFrame(this.animate);
      return;
    }

    if (this.previousTime === 0) {
      this.previousTime = time;
    }

    const delta = Math.min(time - this.previousTime, 50);
    this.previousTime = time;

    if (!this.paused && this.groupWidth > 0 && this.speed > 0) {
      const movement = (this.speed * delta) / 1000;

      if (this.reverseDirection) {
        this.position += movement;

        if (this.position >= 0) {
          this.position = -this.groupWidth;
        }
      } else {
        this.position -= movement;

        if (this.position <= -this.groupWidth) {
          this.position = 0;
        }
      }

      this.track.style.transform = `translate3d(${this.position}px, 0, 0)`;
    }

    this.animationFrame = requestAnimationFrame(this.animate);
  };

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
  }
}
