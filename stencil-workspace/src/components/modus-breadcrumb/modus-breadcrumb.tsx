// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

export interface Crumb {
  display: string;
  id: string;
}

@Component({
  tag: 'modus-breadcrumb',
  styleUrl: 'modus-breadcrumb.scss',
  shadow: true,
})
export class ModusBreadcrumb {
  /** The breadcrumb's aria-label. */
  @Prop() ariaLabel: string | null;

  /** The breadcrumbs to render. */
  @Prop() crumbs: Crumb[] = [];

  /**(optional) A flag that controls the display of underline */
  @Prop() underlineLinks: boolean;

  /** (optional) An event that fires on breadcrumb click. */
  @Event() crumbClick: EventEmitter<Crumb>;

  render(): unknown {
    return (
      <nav aria-label={this.ariaLabel === '' ? null : this.ariaLabel}>
        <ol>
          {this.crumbs.map((crumb, index) => (
            <li key={crumb.id}>
              {index < this.crumbs.length - 1 ? (
                <span class={`crumb ${this.underlineLinks ? 'underline' : ''}`}>
                  <a onClick={() => this.crumbClick.emit(crumb)}>{crumb.display}</a>
                  <span class="divider">{'>'}</span>
                </span>
              ) : (
                <span class="last-crumb" aria-current="page">
                  {crumb.display}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
}
