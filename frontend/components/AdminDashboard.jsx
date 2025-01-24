"use client";
"use client";

import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Modal,
    TextField,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import styled from "styled-components";

// Styled components
const DonationsContainer = styled(Box)`
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DonationItem = styled(ListItem)`
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const ModalContent = styled(Paper)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const DonorDashboard = () => {
    const [donations, setDonations] = useState([
        { id: 1, amount: 500, date: "2023-10-01", details: "Donation for school supplies" },
        { id: 2, amount: 1000, date: "2023-10-05", details: "Donation for library books" },
        { id: 3, amount: 750, date: "2023-10-10", details: "Donation for student scholarships" },
    ]);
    const [openDonationModal, setOpenDonationModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [donationAmount, setDonationAmount] = useState("");
    const [totalDonations, setTotalDonations] = useState(2250); // Initial total donations
    const [selectedDonation, setSelectedDonation] = useState(null);

    // Handle donation modal open
    const handleOpenDonationModal = () => {
        setOpenDonationModal(true);
    };

    // Handle donation modal close
    const handleCloseDonationModal = () => {
        setOpenDonationModal(false);
        setDonationAmount(""); // Reset donation amount input
    };

    // Handle details modal open
    const handleOpenDetailsModal = (donation) => {
        setSelectedDonation(donation);
        setOpenDetailsModal(true);
    };

    // Handle details modal close
    const handleCloseDetailsModal = () => {
        setOpenDetailsModal(false);
        setSelectedDonation(null);
    };

    // Handle donation amount change
    const handleAmountChange = (event) => {
        setDonationAmount(event.target.value);
    };

    // Handle checkout with Chapa
    const handleCheckout = () => {
        if (donationAmount && !isNaN(donationAmount)) {
            const newDonation = {
                id: donations.length + 1,
                amount: parseFloat(donationAmount),
                date: new Date().toISOString().split("T")[0],
                details: "New donation", // Add details as needed
            };

            // Update donations list
            setDonations([...donations, newDonation]);

            // Update total donations
            setTotalDonations(totalDonations + newDonation.amount);

            // Close modal
            handleCloseDonationModal();
        } else {
            alert("Please enter a valid donation amount.");
        }
    };

    return (
        <DonationsContainer>
            <Typography variant="h4" gutterBottom>
                Your Donations
            </Typography>
            <Typography variant="h6" gutterBottom>
                Total Donations: ${totalDonations}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenDonationModal}
                style={{ marginBottom: "20px" }}
            >
                Donate Now
            </Button>
            <List>
                {donations.map((donation) => (
                    <DonationItem
                        key={donation.id}
                        onClick={() => handleOpenDetailsModal(donation)}
                    >
                        <ListItemText
                            primary={`Donation Amount: $${donation.amount}`}
                            secondary={`Date: ${donation.date}`}
                        />
                    </DonationItem>
                ))}
            </List>

            {/* Donation Modal */}
            <Modal open={openDonationModal} onClose={handleCloseDonationModal}>
                <ModalContent>
                    <Typography variant="h6" gutterBottom>
                        Make a Donation
                    </Typography>
                    <TextField
                        label="Amount"
                        type="number"
                        fullWidth
                        value={donationAmount}
                        onChange={handleAmountChange}
                        style={{ marginBottom: "20px" }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleCheckout}
                    >
                        Checkout with Chapa
                    </Button>
                </ModalContent>
            </Modal>

            {/* Donation Details Modal */}
            <Modal open={openDetailsModal} onClose={handleCloseDetailsModal}>
                <ModalContent>
                    <Typography variant="h6" gutterBottom>
                        Donation Details
                    </Typography>
                    {selectedDonation && (
                        <>
                            <Typography variant="body1" gutterBottom>
                                <strong>Amount:</strong> ${selectedDonation.amount}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Date:</strong> {selectedDonation.date}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Details:</strong> {selectedDonation.details}
                            </Typography>
                        </>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleCloseDetailsModal}
                        style={{ marginTop: "20px" }}
                    >
                        Close
                    </Button>
                </ModalContent>
            </Modal>
        </DonationsContainer>
    );
};

export default DonorDashboard;
