class TailwindConstant {
  // Using `any` here will make sure the type is inherited
  // from the actual argument that is passed, since the argument
  // might either be a string or a number.
  value: any;

  // Allows for passing a custom suffix that will be compared
  // with the Tailwind utility that is passed via `util()`.
  suffix?: string;

  constructor(value: number | string, suffix?: string) {
    this.value = value;
    this.suffix = suffix;
  }

  util(names, conditions?) {
    const utils = names.split(" ");
    const match = this.suffix || `-${this.value}`;

    const validName = utils.find((util) => util.endsWith(match));
    const conditionsMet = typeof conditions === "undefined" ? true : conditions;

    if (!validName) {
      throw new Error(
        `Tailwind utilities "${names}" don't include "${match}" match.`
      );
    }

    return conditionsMet ? names : null;
  }
}

export default TailwindConstant;
