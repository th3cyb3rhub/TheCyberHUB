import React from "react";

export const registeredUser = [
    {
        id: 123123,
        player: "kabir0x23",
        CTF: [
            {
                id: 123123,
                challengeName: "OSI Model",
                isAccepted: true,
                isRegistered: true,
                teamCreated: [],
                teamRequests: [
                    {
                        id: 123123,
                        teamName: "Thecyberworld",
                        teamMembers: [
                            { id: 123123, teamMember: "kabir0x23", isAccepted: true, isRegistered: true },
                            { id: 245312, teamMember: "thecyberw0rld", isAccepted: false, isRegistered: true },
                        ],
                        InviteBy: "thecyberw0rld",
                    },
                    {
                        id: 123123,
                        teamName: "King of Hackers",
                        teamMembers: [
                            { id: 123123, teamMember: "kabir0x23", isAccepted: true, isRegistered: true },
                            { id: 245312, teamMember: "thecyberw0rld", isAccepted: false, isRegistered: true },
                        ],
                        InviteBy: "thecyberw0rld",
                    },
                ],
            },
        ],
    },
    {
        id: 245312,
        player: "thecyberw0rld",
        isAccepted: false,
        isRegistered: true,
    },
    {
        id: 128123,
        player: "bugHunter0x",
        isAccepted: true,
        isRegistered: true,
    },
    {
        id: 56756,
        player: "proHacker",
        isAccepted: false,
        isRegistered: false,
    },
    {
        id: 245862,
        player: "hunterMax",
        isAccepted: false,
        isRegistered: true,
    },
    {
        id: 5678,
        player: "killerFrost",
        isAccepted: false,
        isRegistered: false,
    },
];
export const teams = [
    {
        teamId: 1,
        teamName: "Thecyberworld",
        teamMembers: [
            { id: 123123, teamMember: "thecyberw0rld", isAccepted: false, isRegistered: true },
            { id: 245312, teamMember: "kabir0x23", isAccepted: true, isRegistered: true },
        ],
        teamLeader: "kabir0x23",
    },
    {
        teamId: 2,
        teamName: "King of Hackers",
        teamMembers: [
            { id: 128123, teamMember: "bugHunter0x" },
            { id: 245862, teamMember: "hunterMax" },
        ],
        teamLeader: "hunterMax",
    },
];

export const challenges = [
    {
        id: 0,
        challengeName: "OSI Model",
        tags: ["learning", "networking", "ThecyberCTF"],
        difficulty: "medium",
        createdBy: "user1",
        approvedBy: "user2",
        startTime: "2023-04-17T00:00:00.000Z",
        isApproved: true,
        isPublic: true,
        flags: [
            {
                id: 0,
                flag: "Open Systems Interconnection",
                ques: "What does the OSI model stand for?",
                hint: "It stands for Open Systems Interconnection model",
                points: 25,
            },
            {
                id: 1,
                flag: "7",
                ques: "How many layers are there in the OSI model?",
                hint: "There are 7 layers in total",
                points: 25,
            },
            {
                id: 2,
                flag: "Transport",
                ques: "Which layer is responsible for ensuring reliable and error-free communication between network devices?",
                hint: "It is the Transport layer",
                points: 25,
            },
            {
                id: 3,
                flag: "Presentation",
                ques: "Which layer is responsible for converting data into a format that can be transmitted over a network?",
                hint: "It is the Presentation layer",
                points: 25,
            },
        ],
        challengeDescription: (
            <p>
                The OSI (Open Systems Interconnection) model is a conceptual framework used to understand and describe
                the process of communication between different computer systems or devices. It consists of seven layers,
                each with its own specific functions, which work together to facilitate communication across a network.
                The seven layers of the OSI model, from the lowest to the highest, are: 1. Physical Layer: This layer
                deals with the physical transmission of data over the network, including the actual hardware and
                physical medium used for communication, such as cables, switches, and hubs. 2. Data Link Layer: This
                layer provides error-free communication between directly connected devices by creating a reliable link
                between them. It is responsible for establishing and maintaining the link, as well as error detection
                and correction. 3. Network Layer: This layer is responsible for routing data between different networks
                or subnets. It determines the optimal path for data packets to reach their destination, and deals with
                addressing, packet fragmentation, and congestion control. 4. Transport Layer: This layer ensures
                reliable and efficient communication between end-to-end devices. It provides services such as
                segmentation and reassembly of data, flow control, and error recovery. 5. Session Layer: This layer
                establishes, maintains, and terminates communication sessions between applications on different devices.
                It manages session synchronization, checkpoints, and recovery mechanisms. 6. Presentation Layer: This
                layer is responsible for data representation, translation, and encryption. It ensures that data sent by
                one system is understood by the receiving system, regardless of their different data formats and
                representations. 7. Application Layer: This is the topmost layer of the OSI model, and it represents the
                applications or processes that directly interact with the end users. It includes protocols and services
                for tasks such as email, file transfer, and remote access. The OSI model provides a common reference
                framework for understanding and designing communication protocols and networks. It allows different
                vendors and systems to communicate with each other by adhering to the same set of rules and standards.
                However, it should be noted that the OSI model is a theoretical framework and not a strict
                implementation, as real-world networks often use a combination of protocols from different layers.
            </p>
        ),
    },
    {
        id: 1,
        challengeName: "Cryptography Challenge",
        challengeDescription: "A challenge that involves solving various cryptographic puzzles and ciphers.",
        tags: ["Learning", "Cryptography", "ThecyberCTF"],
        difficulty: "Hard",
        points: 150,
        createdBy: "user1",
        approvedBy: "user2",
        startTime: "2023-04-20T00:00:00.000Z",
        isApproved: true,
        isPublic: true,
        flags: [
            {
                id: 0,
                flag: "Caesar Cipher",
                ques: "What is the name of the substitution cipher where each letter in the plaintext is shifted by a certain number of positions?",
                hint: "It is named after a famous Roman military general",
                points: 50,
            },
            {
                id: 1,
                flag: "RSA",
                ques: "What is the name of the asymmetric encryption algorithm that is widely used for secure data transmission?",
                hint: "It is named after its inventors: Rivest, Shamir, and Adleman",
            },
            {
                id: 2,
                flag: "Hash Function",
                ques: "What is the name of the cryptographic function that takes an input and produces a fixed-size output, which is typically a string of characters?",
                hint: "It is commonly used for data integrity verification and password storage",
                points: 50,
            },
            {
                id: 3,
                flag: "Symmetric Key",
                ques: "What is the name of the type of cryptography where the same key is used for both encryption and decryption?",
                hint: "It is also known as secret-key or private-key cryptography",
                points: 50,
            },
        ],
    },
];
