export const convertToSlug = (text: string): string => {
  return text.toLocaleLowerCase().trim()
    .replace(/[\s\W-]+/g,'')
    .replace(/^-+|-+$/g, '')
}