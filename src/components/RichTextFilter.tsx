type RichTextFilterProps = {
  id: string;
  name: string;
  filterValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RichTextFilter = ({ id, name, filterValue, onChange }: RichTextFilterProps) => {
  return (
    <div style={{ marginBottom: '0.5rem', display: 'flex', marginLeft: '0.5rem', gap: '0.2rem' }}>
      <label htmlFor="id">where {name} is</label>
      <input
        id={id}
        type="text"
        name={name}
        value={filterValue}
        onChange={onChange}
        placeholder={`filter by ${name}`}
      />
    </div>
  );
};
