type RichTextFilterProps = {
  name: string;
  filterValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RichTextFilter = ({ name, filterValue, onChange }: RichTextFilterProps) => {
  return (
    <div style={{ marginBottom: '0.5rem', display: 'flex', marginLeft: '0.5rem', gap: '0.2rem' }}>
      <label htmlFor="id">where {name} is</label>
      <input
        id={name}
        type="text"
        name={name}
        value={filterValue}
        onChange={onChange}
        placeholder={`filter by ${name}`}
      />
    </div>
  );
};
