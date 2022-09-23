export enum FilterOptionType {
  Checkbox = "checkbox",
  Select = "select",
  Input = "input",
  Header = "header",
  Separator = "separator",
}

export interface FilterOption {
  kind: FilterOptionType;
  id: string;
  label: string;
  defaultValue: unknown;
}

export abstract class FilterOptionAbstract implements FilterOption {
  kind = FilterOptionType.Separator;
  id: string;
  label: string;
  defaultValue: unknown;

  constructor(id: string, label: string, defaultValue: unknown) {
    this.id = id;
    this.label = label;
    this.defaultValue = defaultValue;
  }
}

export class FilterCheckbox extends FilterOptionAbstract {
  kind = FilterOptionType.Checkbox;
}

export class FilterSelect extends FilterOptionAbstract {
  kind = FilterOptionType.Select;
  options: { label: string; value: string }[] = [];

  withOptions(options: { label: string; value: string }[]): FilterSelect {
    this.options = options;
    return this;
  }
}

export class FilterInput extends FilterOptionAbstract {
  kind = FilterOptionType.Input;
  placeholder?: string;

  withPlaceholder(placeholder: string): FilterInput {
    this.placeholder = placeholder;
    return this;
  }
}

export class FilterHeader extends FilterOptionAbstract {
  kind = FilterOptionType.Header;
  order?: number;

  withOrder(order: number): FilterHeader {
    this.order = order;
    return this;
  }
}

export class FilterSeparator extends FilterOptionAbstract {
  kind = FilterOptionType.Separator;
}
