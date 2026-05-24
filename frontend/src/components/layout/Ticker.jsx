import { tickerItems } from '../../data/mockData';

const colorMap = {
  green:  'text-accent-green',
  blue:   'text-accent-blue',
  purple: 'text-accent-purple',
  orange: 'text-accent-orange',
};

export default function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="h-[38px] bg-bg-secondary border-b border-[rgba(255,255,255,0.05)] overflow-hidden flex items-center">
      <div className="flex gap-12 px-6 whitespace-nowrap animate-ticker">
        {doubled.map((item, i) => (
          <span key={i} className="text-xs font-mono text-text-secondary">
            {item.label}{' '}
            <span className={colorMap[item.color] || 'text-accent-green'}>
              {item.value} {item.change || ''}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
