import { Button } from '@mui/material';

const ExportsaleCSV = ({ sales }) => {
  const handleCSV = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/export/sale/export-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sales }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorText = await response.text();
        console.error("Error exporting CSV:", errorText);
        alert("Failed to export CSV. Please check the server.");
      }
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("An unexpected error occurred. Please try again.");
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

export default ExportsaleCSV;
