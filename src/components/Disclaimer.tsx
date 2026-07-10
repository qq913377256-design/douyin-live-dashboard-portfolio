type Props = { text: string; compact?: boolean }

export function Disclaimer({ text, compact = false }: Props) {
  return <aside className={`disclaimer${compact ? ' disclaimer-compact' : ''}`} aria-label="数据与隐私声明">{text}</aside>
}
