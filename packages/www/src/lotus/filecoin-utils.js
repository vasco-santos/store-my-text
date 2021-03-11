export const FilecoinPrecision = 1_000_000_000_000_000_000

const byteSizeUnits = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB']
export function sizeString (bi) {
  let i = 0
  for (; bi > 1024 && i < byteSizeUnits.length; i++) {
    bi /= 1024
  }
  bi = Math.round(bi * 100) / 100
  return `${bi} ${byteSizeUnits[i]}`
}
