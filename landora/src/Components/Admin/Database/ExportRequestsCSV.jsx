import React from "react";
import {Button,} from '@mui/material';

const ExportRequestCSV = ({ requests }) => {
  const handleRequestCSV = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/export/requests/export-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requests }),
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
  onClick={handleRequestCSV}
  sx={{ borderRadius: 2, marginLeft: 'auto' }}
>
  Refresh Server
</Button>;
};

export default ExportRequestCSV;
