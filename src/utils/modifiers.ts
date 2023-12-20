export default (blockName: string, modifiers: string | undefined): string => {
  if (!modifiers) {
    return blockName;
  }

  const modifierClasses = modifiers
    .split(' ')
    .filter(modifier => !!modifier)
    .map(modifier => `${blockName}--${modifier}`)
    .join(' ');

  return `${blockName} ${modifierClasses}`;
}