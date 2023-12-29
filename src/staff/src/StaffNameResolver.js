import nameResolver from './staff.json';

function resolveName(id: string): string {
  return nameResolver[id];
}

export default resolveName;