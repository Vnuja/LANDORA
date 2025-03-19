import React from "react";
import {Button,} from '@mui/material';

const ExportUserCSV = ({ users }) => {
  const handleCSV = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/export/export-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  return <Button
  variant="contained"
  color="secondary"
  onClick={handleCSV}
  sx={{ borderRadius: 2, marginLeft: 'auto' }}
>
  Refresh Server
</Button>;
};

export default ExportUserCSV;
