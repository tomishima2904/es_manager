import { useState } from "react";

const CompanyForm = (props: { company: string }) => {
  const { company } = props;
  const [companyName, setCompanyName] = useState<string>(company);
  const [editing, setEditing] = useState<boolean>(false);
  const [tempCompanyName, setTempCompanyName] = useState<string>("");

  const startEditing = () => {
    setTempCompanyName(companyName);
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempCompanyName(e.target.value);
  };

  // フォーカスが外れたら編集完了
  const handleBlur = () => {
    setCompanyName(tempCompanyName);
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-starth-16 p-2">
      {editing ? (
        <input
          type="text"
          className="px-2 py-1 rounded-lg border border-gray-300 bg-transparent"
          value={tempCompanyName}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <>
          <h1 className="text-lg font-bold" onDoubleClick={startEditing}>
            {companyName}
          </h1>
        </>
      )}
    </div>
  );
};

export default CompanyForm;
