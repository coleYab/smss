"use client";

import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import TableViewTemplate from "./TableViewTemplate";

const SeeNotice = () => {
  const mockNoticesList = [
    {
      _id: "1",
      title: "Holiday Notice",
      details: "School will remain closed on Friday.",
      date: "2025-01-20T00:00:00.000Z",
    },
    {
      _id: "2",
      title: "Exam Schedule",
      details: "Midterm exams start next Monday.",
      date: "2025-01-15T00:00:00.000Z",
    },
    {
      _id: "3",
      title: "Parent-Teacher Meeting",
      details: "Scheduled for the 1st of February.",
      date: "2025-01-25T00:00:00.000Z",
    },
  ];

  const [noticesList, setNoticesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating data fetch with mock data
    const fetchNotices = async () => {
      try {
        setLoading(true);
        // Simulate a delay for fetching data
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setNoticesList(mockNoticesList);
      } catch (err) {
        setError("Failed to fetch notices.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "details", label: "Details", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const noticeRows = noticesList.map((notice) => {
    const date = new Date(notice.date);
    const dateString =
      date.toString() !== "Invalid Date"
        ? date.toISOString().substring(0, 10)
        : "Invalid Date";
    return {
      title: notice.title,
      details: notice.details,
      date: dateString,
      id: notice._id,
    };
  });

  return (
    <div style={{ marginTop: "50px", marginRight: "20px" }}>
      {loading ? (
        <div style={{ fontSize: "20px" }}>Loading...</div>
      ) : error ? (
        <div style={{ fontSize: "20px" }}>{error}</div>
      ) : noticesList.length === 0 ? (
        <div style={{ fontSize: "20px" }}>No Notices to Show Right Now</div>
      ) : (
        <>
          <h3 style={{ fontSize: "30px", marginBottom: "40px" }}>Notices</h3>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {Array.isArray(noticesList) && noticesList.length > 0 && (
              <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
            )}
          </Paper>
        </>
      )}
    </div>
  );
};

export default SeeNotice;
