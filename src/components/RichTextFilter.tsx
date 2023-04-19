type RichTextFilterProps = {
    name: string;
    filterValue: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  export const RichTextFilter = ({ name, filterValue, onChange }: RichTextFilterProps) => {
    return (
      <div style={{ marginBottom: '0.5rem' }}>
        <label htmlFor="id">Id</label>
        <input
          type="text"
          name={name}
          value={filterValue}
          onChange={onChange}
          placeholder={`filter by ${name}`}
        />
      </div>
    );
  };