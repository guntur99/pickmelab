# `PICKME - Event Ticket App`
- [Video Demo](https://youtu.be/8KNDj6gYdo0)

# Overview

PICKME is a multi-event ticketing platform that is flexible, transparent, and secure. It allows anyone to create events, from small live music performances to international events. PICKME leverages decentralized blockchain technology and smart contracts to ensure security, transparency, and anonymity in all event-related activities and ticket purchases. Additionally, users can enjoy features such as rewards in the form of NFTs and tokens.

# Problem Statement

The current event management landscape faces significant challenges:

Data Breaches: Vulnerability to hacking and data manipulation.

Ticket Transfer Issues: Complicated processes for ticket verification when transferring or reselling tickets due to unforeseen circumstances.

Fraudulent Tickets: Lack of transparency in ticket ownership, enabling counterfeit tickets.

Outdated Verification Processes: Inefficient and outdated methods for ticket verification.

# Our Solution

PICKME addresses these issues through:

Blockchain Technology: Decentralized implementation with ICP for enhanced data security and convenience.

Efficient Ticket Management: Secure, fast, and easy transfer and resale of tickets.

Reseller Packages: Bulk ticket purchases with discounted rates.

Advanced Verification: Face AI recognition and QR code scanning for seamless ticket verification.

# Features

Event Creation: Organizers or individuals can create events with multiple categories based on their membership packages.

Ticket Transfer: Secure and easy ticket transfers.

Reseller Packages: Discounts on bulk ticket purchases for resellers.

Face AI Training: Improves face recognition accuracy.

Ticket Verification: Face AI recognition and QR code scanning for attendance.

VIP & VVIP Rewards: Bundled tickets with NFTs for exclusive benefits.

# Objectives

Modern and Secure Experience: Provide a comfortable, safe, and modern ticketing experience.

Community Engagement: Offer NFT rewards and a platform for community sharing.

Blockchain Awareness: Educate users about blockchain, especially ICP, across all age groups.

Scalability: Enable events of any size, from small private gatherings to large-scale events like national sports matches.

# Example Use Case

Raemi, a high school student and aspiring musician, uses PICKME to organize a small event for 10 friends. By selling tickets, she gains experience, fans, and revenue while rewarding attendees with exclusive NFTs. This fosters a community and offers long-term investment opportunities for her supporters.

# Vision

PICKME strives to:

Revolutionize the event ticketing landscape with cutting-edge technology.

Empower individuals and organizations to host events with ease and transparency.

Foster a vibrant ecosystem of creators, attendees, and communities through blockchain-powered rewards and secure ticketing solutions.

# Setup Environment
1. git clone
2. run ./download-face-detection-model.sh
3. run (install python & pip first) 
    1. pip3 install facenet-pytorch 
    2. pip3 install torch 
    3. pip3 install onnx
4. run python3 and enter
    1. import torch
    2. import facenet_pytorch
    3. resnet = facenet_pytorch.InceptionResnetV1(pretrained='vggface2').eval()
    4. input = torch.randn(1, 3, 160, 160)
    5. torch.onnx.export(resnet, input, "face-recognition.onnx", verbose=False, opset_version=11)
5. run cargo install wasm-opt (npm install first if nodejs not installed)
6. run
    1. dfx start --background
    2. dfx deploy
7. run cargo install ic-file-uploader
8. run ./upload-models-to-canister.sh
