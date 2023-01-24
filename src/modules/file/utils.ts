export function generateFolderFile(
  type: string,
  level: number,
  fileName: string
) {
  return `mission-${type}/level-${level}/${fileName}`;
}

export function generateBugFileName(
  bugIndex: number,
  bugType: string,
  index: number,
  type: string
) {
  return `bug-${bugIndex + 1}-${bugType}-${index + 1}.${type}`;
}

export function generateMissionFileName(name: string, type: string) {
  return `${name}.${type}`;
}
