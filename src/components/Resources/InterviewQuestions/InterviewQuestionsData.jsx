const InterviewsQuestionsData = [
    {
        id: 1,
        title: "Encryption and Authentication",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "How do cookies work?",
                answer: `Cookies are small text files that a website sends to your browser and are stored on your computer or device. When you visit the website again, your browser sends the cookie back to the website's server, allowing it to remember your preferences or login information.
                
For example, when you log in to a website, a cookie is usually created so that the website can remember that you are logged in as you navigate to different pages. Without cookies, you would need to log in again every time you visited a new page on the site.

Another example is when you visit an e-commerce website and add items to your shopping cart. The website uses cookies to keep track of your cart, so if you leave the site and come back later, your items will still be in the cart.`,
            },
            {
                question: "How do sessions work?",
                answer: `In web development, a session refers to a way to store information about a user across multiple pages or requests. When a user first visits a website, a session is typically created on the server side, and a unique session ID is generated and stored in a cookie on the user's browser.
                
As the user continues to interact with the website, the session ID is sent back to the server with each request, allowing the server to retrieve information about the user's session and personalize the user's experience. For example, a shopping website might use sessions to keep track of items in a user's shopping cart as they browse the site.

Sessions can also be used to implement user authentication and authorization. For example, a user might log in to a website and then be assigned a session that grants them access to certain parts of the site that are only available to authenticated users.
`,
            },
            {
                question: "Explain how OAuth works?",
                answer: `OAuth is a protocol that allows users to grant access to their resources to third-party applications without giving away their credentials. The OAuth process consists of three parties: the user, the application requesting access, and the service provider (such as Facebook or Google). 
                
After the user approves the application's request, the service provider generates an access token that allows the application to access the user's resources. This access token can be refreshed or revoked at any time by the user.`,
            },
            {
                question: "What is a public key infrastructure flow and how would I diagram it?",
                answer: `Public Key Infrastructure (PKI) is a system of digital certificates, certificate authorities, and other registration authorities that verify and authenticate the validity of each party involved in an electronic transaction.

A PKI flow diagram would illustrate the issuance, validation, and revocation of digital certificates, the roles and trust relationships between certificate authorities, and the use of encryption and decryption keys to secure communication. It would also show how digital certificates are used to establish trust and ensure confidentiality, integrity, and non-repudiation in electronic transactions.`,
            },
            {
                question: "Describe the difference between synchronous and asynchronous encryption?",
                answer: `Synchronous encryption, also known as symmetric encryption, uses a single shared secret key to both encrypt and decrypt data. Asynchronous encryption, also known as public-key encryption, uses a pair of keys - a public key and a private key - to encrypt and decrypt data.
                
The main difference is that synchronous encryption is faster and simpler, but requires secure distribution of the shared key, while asynchronous encryption is slower and more complex, but does not require secure distribution of keys.`,
            },
            {
                question: "Describe SSL handshake?",
                answer: `SSL (Secure Sockets Layer) handshake is the process of establishing a secure connection between a client and a server.
                 
The SSL handshake process consists of several steps, including the client and server exchanging information about their encryption capabilities and public keys, verifying the server's digital certificate, and agreeing on a session key that will be used for encryption and decryption of data during the session.

Once the handshake is complete, the client and server can securely exchange data over the connection.`,
            },
            {
                question: "How does HMAC work?",
                answer: `HMAC (Hash-based Message Authentication Code) is a type of message authentication code that uses a cryptographic hash function and a secret key to verify the authenticity and integrity of a message. 
                
HMAC works by applying the hash function to the message and the secret key, and then combining the result with a specific padding algorithm. The output of this process is the HMAC, which can be sent along with the message.

The recipient can then use the same hash function and secret key to generate the HMAC and compare it with the received HMAC to verify the message's authenticity and integrity.`,
            },
            {
                question: "Why HMAC is designed in that way?",
                answer: `HMAC is designed to provide message authentication and integrity verification while also preventing attacks that exploit vulnerabilities in hash functions. By combining the hash function with a secret key, HMAC prevents attackers from using precomputed hash values to generate fake HMACs.
                
The padding algorithm used in HMAC also helps to ensure that the output is of a fixed length and thus harder to tamper with. Overall, HMAC is a robust and widely used method for message authentication and integrity verification.`,
            },
            {
                question: "What is the difference between authentication vs authorization name spaces?",
                answer: `Authentication and authorization are two concepts used in access control. Authentication refers to the process of verifying the identity of a user or system. Authorization refers to the process of granting or denying access to a resource based on the verified identity of the user or system.
                    
An example of authentication would be providing a username and password to log in to a system, while an example of authorization would be granting access to certain files or folders based on the user's role or permissions.`,
            },
            {
                question: "What’s the difference between Diffie-Hellman and RSA?",
                answer: `Diffie-Hellman and RSA are both cryptographic algorithms used for key exchange and encryption. The main difference between the two is that Diffie-Hellman is a key exchange algorithm, while RSA is an encryption and signature algorithm.
                    
Diffie-Hellman is used to establish a shared secret between two parties, while RSA is used to encrypt messages and verify digital signatures. In other words, Diffie-Hellman is used to securely exchange keys, and RSA is used to encrypt data using those keys.`,
            },
            {
                question: "How does Kerberos work?",
                answer: `Kerberos is a network authentication protocol used to provide secure authentication over a non-secure network. It uses a client/server model and relies on a trusted third party (the Key Distribution Center or KDC) to verify the identity of users and grant them access to resources. 
                    
When a user attempts to access a resource, they send a request to the KDC, which then generates a ticket that contains a session key that can be used to encrypt and decrypt data. The ticket is then sent back to the user, who can use it to access the requested resource.`,
            },
            {
                question: "If you're going to compress and encrypt a file, which do you do first and why?",
                answer: `When compressing and encrypting a file, it is recommended to compress the file first and then encrypt it. This is because compression changes the structure of the file, making it more difficult to decrypt. 
                    
Encrypting the file first and then compressing it could potentially reveal information about the file's structure, making it easier to decrypt. Compressing the file first also reduces the size of the file, making it faster to encrypt and transfer.`,
            },
            {
                question: "How do I authenticate you and know you sent the message?",
                answer: `To authenticate a message and ensure it was sent by the intended sender, digital signatures can be used. Digital signatures use public-key cryptography to verify the identity of the sender and the integrity of the message. 
                    
The sender uses their private key to generate a unique digital signature, which is then attached to the message. The recipient can then use the sender's public key to verify the signature and ensure the message has not been tampered with.`,
            },
            {
                question: "Should you encrypt all data at rest?",
                answer: `Encrypting all data at rest is generally a good practice as it provides an additional layer of security in case physical security measures fail. It ensures that if an attacker gains physical access to the storage medium, they will not be able to access the data without the encryption key. 
                    
However, it may not be practical to encrypt all data in certain situations, such as when dealing with extremely large data sets or when the overhead of encryption and decryption is too high.`,
            },
            {
                question: "What is Perfect Forward Secrecy?",
                answer: `Perfect Forward Secrecy (PFS) is a security feature of communication protocols that ensures past messages cannot be decrypted even if the secret keys are compromised. PFS uses unique keys generated for each session or message exchange, which are not derived from the long-term secret key.
                
This means that if a long-term key is compromised, the attacker cannot use it to decrypt past messages that were encrypted with session keys. HTTPS protocol uses PFS by generating a new session key for each communication session, ensuring that even if an attacker gains access to the private key, they cannot decrypt past sessions.`,
            },
        ],
    },
    {
        id: 2,
        title: "Network Level and Logging",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "What are common ports involving security, what are the risks and mitigations?",
                answer: `Common security-related ports include 22 (SSH), 80 (HTTP), 443 (HTTPS), 1433/1434 (Microsoft SQL Server), 3306 (MySQL), and 5432 (PostgreSQL). The risks vary depending on the specific port and its use, but can include attacks such as port scanning, denial-of-service (DoS) attacks, and data breaches.
                
Mitigations include using firewalls to block unused ports, limiting access to ports through network access control (NAC) policies, and implementing secure protocols and encryption to protect data transmitted over open ports.`,
            },
            {
                question: "Which one for DNS?",
                answer: `The most common port for DNS is port 53`,
            },
            {
                question: "Describe HTTPS and how it is used?",
                answer: `HTTPS (HTTP Secure) is a protocol for secure communication over the internet. It uses encryption to protect data transmitted between a client (e.g., a web browser) and a server. HTTPS is commonly used for transmitting sensitive information such as login credentials, financial information, and personal data.
                
To use HTTPS, a website must have an SSL/TLS certificate installed on the server, which enables encryption and verifies the identity of the server to the client. The use of HTTPS can help prevent man-in-the-middle attacks and unauthorized access to sensitive data.`,
            },
            {
                question: "What is the difference between HTTPS and SSL?",
                answer: `HTTPS is a protocol for secure communication over the internet, while SSL (Secure Sockets Layer) is a cryptographic protocol that provides security for communication over the internet. 
                
HTTPS uses SSL/TLS (Transport Layer Security) to encrypt data transmitted between a client and a server. SSL has been deprecated and replaced by TLS, but the term SSL is still often used colloquially to refer to both SSL and TLS.`,
            },
            {
                question: "How does threat modeling work?",
                answer: `Threat modeling is a process for identifying and prioritizing potential threats to a system or application. It involves identifying potential attackers, their motivations, and the methods they might use to attack the system.
                
Threat modeling typically involves the following steps: defining the system or application boundaries, identifying and ranking assets and their value, identifying potential threats and vulnerabilities, evaluating the likelihood and impact of each threat, and identifying and prioritizing mitigations to address the most significant threats. 

Threat modeling can help organizations better understand their security risks and make informed decisions about how to allocate resources to mitigate those risks.`,
            },
            {
                question: "What is a subnet and how is it useful in security?",
                answer: `A subnet is a smaller network created by dividing a larger network. It allows network administrators to separate network resources and apply different security policies to different subnets based on their level of trust.
                     
Subnets can also be used to reduce the broadcast traffic on a network and improve network performance. By dividing a network into subnets, it is easier to isolate and contain security breaches since attackers will have a smaller network to target.`,
            },
            {
                question: "What is subnet mask?",
                answer: `A subnet mask is a 32-bit number that is used to identify the subnet portion of an IP address. It is used by network devices to determine which bits in an IP address represent the network ID and which bits represent the host ID.
                    
The subnet mask is used in conjunction with the IP address to determine the network address, broadcast address, and the valid IP addresses in a subnet. It is an essential component of IP addressing and subnetting and helps in network management and security.`,
            },
            {
                question: "Explain what traceroute is?",
                answer: `Traceroute is a network diagnostic tool that displays the route and the time taken for packets to travel from one network device to another over an IP network. It works by sending packets with gradually increasing TTL (Time-to-Live) values to each device along the path to the destination.
                    
Each device along the path decrements the TTL value, and if it reaches zero, it sends an ICMP (Internet Control Message Protocol) message back to the source indicating that the packet has expired. Traceroute uses this information to build a list of devices that the packets have passed through, helping to identify network connectivity and performance issues.`,
            },
            {
                question:
                    "Draw a network, then expect them to raise an issue and have to figure out where it happened?",
                answer: `This is a practical test of the candidate's ability to visualize and analyze a network topology and troubleshoot network issues. The interviewer may present a network diagram and ask the candidate to identify any potential security risks, performance issues, or connectivity problems.
                     
The candidate must be able to use their knowledge of networking protocols and tools to analyze the network traffic and identify the point of failure or the source of the issue. This test assesses the candidate's technical skills, critical thinking, and problem-solving ability under pressure.`,
            },
            {
                question:
                    "Write out a Cisco ASA firewall configuration on the white board to allow three networks unfiltered access, 12 networks limited access to different resources on different networks, and 8 networks to be blocked altogether.?",
                answer: `To configure a Cisco ASA firewall to allow unfiltered access for three networks, limit access for 12 networks to specific resources on different networks, and block eight networks altogether, one could use access control lists (ACLs). First, permit traffic from the three networks with an ACL.
                
Then, create ACLs to allow traffic to specific resources on different networks for the 12 limited access networks. Finally, create ACLs to block traffic from the eight networks that should be blocked altogether. These ACLs can then be applied to the firewall's interface(s) to enforce the desired network access policies.`,
            },
            {
                question: "Explain TCP/IP concepts?",
                answer: `TCP/IP is a suite of communication protocols used to interconnect network devices. TCP (Transmission Control Protocol) is responsible for reliable data transmission and flow control. 
                
IP (Internet Protocol) handles packet routing and addressing. Together, TCP/IP enables end-to-end data communication over the internet. For example, when you send an email, TCP breaks the message into packets and reassembles them at the destination, while IP routes them to the correct address.`,
            },
            {
                question: "What is OSI model?",
                answer: `The OSI (Open Systems Interconnection) model is a conceptual framework for understanding how network communication occurs. It consists of seven layers, each with specific functions that ensure reliable and secure communication. The layers are physical, data link, network, transport, session, presentation, and application. 
                
For example, the physical layer deals with physical network components, such as cables and connectors, while the application layer handles user interface and data exchange.`,
            },
            {
                question: "How does a router differ from a switch?",
                answer: `Routers and switches are both network devices, but they have different functions. A switch connects devices within a network, allowing them to communicate with each other. 
                
A router, on the other hand, connects multiple networks, allowing them to communicate with each other. A router forwards data packets between networks based on their IP addresses, while a switch forwards data packets between devices based on their MAC addresses.`,
            },
            {
                question:
                    "Describe the Risk Management Framework process and a project where you successfully implemented compliance with RMF.",
                answer: `The Risk Management Framework (RMF) is a process used to identify, assess, and manage risks to an organization's information systems. The process consists of six steps: Categorize, Select, Implement, Assess, Authorize, and Monitor.
                
I successfully implemented compliance with RMF in a project to secure a government agency's network. We categorized the information system based on the impact of a potential security breach, selected security controls, implemented those controls, assessed their effectiveness, authorized the system for use, and monitored it for ongoing security. This process ensured that the system was secure and compliant with government regulations.`,
            },
            {
                question: "How does a packet travel between two hosts connected in same network?",
                answer: `When two hosts are connected in the same network, the packet travels through the following steps: 

1. The sending host encapsulates the data into a packet with the destination IP address. 

2. The sending host sends the packet to its default gateway or switch. 

3. The switch forwards the packet to the destination host based on its MAC address. 4. The receiving host processes the packet and sends an acknowledgement to the sending host.`,
            },
            {
                question: "Explain the difference between TCP and UDP?",
                answer: `TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are two transport layer protocols used for communication over the internet. The main differences between them are: - TCP is a connection-oriented protocol while UDP is connectionless. 
                    
- TCP provides reliable data delivery with error checking and flow control while UDP does not. 

- TCP is slower than UDP due to the overhead of connection establishment and error checking. 

- TCP is used for applications that require reliable data delivery like email and file transfers while UDP is used for applications that require low latency and fast data transfer like video streaming and gaming.`,
            },
            {
                question: "Which is more secure and why?",
                answer: `TCP is considered more secure than UDP due to its reliability and error checking mechanisms. TCP ensures that all packets are delivered in order and without errors by retransmitting lost packets and controlling the flow of data. UDP, on the other hand, does not guarantee reliable data delivery or error checking, which makes it more vulnerable to attacks. 
                    
However, both protocols can be made secure through the use of encryption and other security mechanisms.`,
            },
            {
                question: "What is the TCP three way handshake?",
                answer: `The TCP three way handshake is the process used by TCP to establish a connection between two hosts. The steps are: 
                    
1. The sending host sends a SYN (synchronize) packet to the receiving host. 

2. The receiving host responds with a SYN-ACK (synchronize-acknowledgement) packet to confirm receipt of the SYN packet and to request synchronization of sequence numbers. 

3. The sending host sends an ACK (acknowledgement) packet to confirm receipt of the SYN-ACK packet and to synchronize the sequence numbers. At this point, the connection is established and data can be transmitted between the two hosts.`,
            },
            {
                question: "What is the difference between IPSEC Phase 1 and Phase 2?",
                answer: `IPSEC (Internet Protocol Security) is a protocol used for securing internet communications. It has two phases:

Phase 1: In this phase, the two hosts establish a secure communication channel by negotiating the security parameters like encryption algorithms, authentication methods, and key exchange mechanisms. This phase establishes a secure tunnel between the hosts.
                    
Phase 2: In this phase, the hosts use the secure tunnel established in phase 1 to exchange data. This phase involves negotiating the security parameters for the data transfer and establishing the encryption keys. Phase 2 can be repeated multiple times to create multiple secure tunnels.`,
            },
            {
                question: "What are the biggest AWS security vulnerabilities?",
                answer: `The biggest AWS security vulnerabilities include misconfigurations, improper access controls, and account hijacking. Misconfigurations can lead to data breaches, while improper access controls can lead to unauthorized access to sensitive resources. 
                        
Account hijacking can occur if an attacker gains access to an AWS user's credentials, allowing them to perform actions on the user's behalf.
                        
Other vulnerabilities include DDoS attacks, data leakage, and insufficient logging and monitoring. AWS provides various security features to help mitigate these risks, but it's important for users to properly configure and monitor their environments.`,
            },
            {
                question: "How do web certificates for HTTPS work?",
                answer: `Web certificates for HTTPS work by using a combination of public key cryptography and digital signatures. When a user connects to a website using HTTPS, the website's server presents its digital certificate, which contains its public key. 
                        
The user's web browser uses this public key to encrypt a random symmetric key, which is then used to encrypt the data sent between the user and the website. The website's server uses its private key to decrypt the symmetric key, allowing it to decrypt the data sent by the user.`,
            },
            {
                question: "What is the purpose of TLS?",
                answer: `The purpose of TLS (Transport Layer Security) is to provide secure communication over a network by encrypting data sent between two endpoints. 
                        
TLS is commonly used to secure HTTPS connections between web servers and clients, but can also be used to secure other types of network communication. 
                        
TLS uses a combination of symmetric and asymmetric encryption to provide confidentiality, integrity, and authenticity of data transmitted over the network.`,
            },
            {
                question: "Is ARP UDP or TCP?",
                answer: `ARP (Address Resolution Protocol) is neither UDP nor TCP. 
                        
ARP is a protocol that operates at the Data Link layer of the OSI model, and is used to map a device's IP address to its MAC address on a local network. ARP packets are encapsulated in Ethernet frames, and are sent directly between devices on the local network without the need for transport layer protocols like UDP or TCP.`,
            },
        ],
    },
    {
        id: 3,
        title: "OWASP Top 10, Pentesting and/or Web Applications",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "Differentiate XSS from CSRF.",
                answer: `XSS (Cross-Site Scripting) is an attack where an attacker injects malicious scripts into a website or application that is then executed by unsuspecting users who access the compromised site. 
                
In contrast, CSRF (Cross-Site Request Forgery) is an attack where an attacker tricks a user into performing an action on a website without their knowledge or consent, often by tricking them into clicking a link or button that initiates the action. 

Unlike XSS, CSRF does not directly involve injecting malicious code into the site.`,
            },
            {
                question: "What do you do if a user brings you a PC that is acting weird? You suspect malware.",
                answer: `If a user brings you a PC that is acting weird and you suspect malware, the first step is to disconnect the computer from the internet to prevent the malware from communicating with its controller. 
                
Then, run a full system scan with an updated antivirus program to detect and remove any known malware. If the antivirus doesn't detect anything, try running a malware removal tool or a rootkit scanner. Finally, check for any suspicious programs or files and remove them.`,
            },
            {
                question: "What is the difference between tcpdump and FWmonitor?",
                answer: `Tcpdump and FWmonitor are both tools used for packet capture and analysis, but they operate at different levels of the network stack. 
                
Tcpdump captures and displays packets at the network layer (layer 3) of the OSI model, while FWmonitor captures packets at the firewall layer (usually layer 4 or 5). FWmonitor is typically used for monitoring firewall activity, while tcpdump is more commonly used for general packet capture and analysis.`,
            },
            {
                question: "Do you know what XXE is?",
                answer: `XXE (XML External Entity) is an attack that exploits applications that parse XML input from untrusted sources. 
                
The attack involves sending malicious XML data to the application that includes a reference to an external entity. When the application parses the data, it resolves the entity, allowing an attacker to read arbitrary files or execute code on the system hosting the vulnerable application.`,
            },
            {
                question: "Explain man-in-the-middle attacks.",
                answer: `Man-in-the-middle (MITM) attacks occur when an attacker intercepts and possibly modifies communication between two parties who believe they are communicating directly with each other. 
                
The attacker may intercept and alter messages or impersonate one of the parties to gain access to sensitive information such as login credentials or financial data. 

MITM attacks can be carried out through various means, such as eavesdropping on unencrypted communications or using malicious software to redirect traffic to a fake website that appears legitimate to the user. Encryption and secure communication protocols such as HTTPS can help prevent MITM attacks. `,
            },
            {
                question: "What is a Server Side Request Forgery attack?",
                answer: `A Server Side Request Forgery (SSRF) attack is a type of security exploit where an attacker can make unauthorized requests from a server. 
                    
This is done by tricking the server into sending a request to an attacker-controlled domain. The attacker can then use the server's credentials to access sensitive data or perform actions that should only be available to the server. 

One example of an SSRF attack is where an attacker sends a request to the server to access internal resources, such as databases, that are not publicly accessible.`,
            },
            {
                question: "Describe what are egghunters and their use in exploit development.",
                answer: `Egghunters are a type of exploit development technique used to search for shellcode in memory when the exploit payload does not fit into available memory space. 
                    
The egghunter technique involves searching for a unique pattern called an "egg" in memory. Once the egg is found, the egghunter can locate the actual shellcode that follows it. Egghunters can be used to bypass memory constraints and exploit systems where the payload cannot fit into memory.`,
            },
            {
                question: "How is padlock icon in the browser generated?",
                answer: `The padlock icon in the browser is generated using the SSL/TLS protocol, which provides secure communication between the web server and client browser. When a user connects to a website using SSL/TLS, the browser and server perform a "handshake" to establish a secure connection.

The browser then verifies the server's SSL/TLS certificate to ensure that it is valid and has been issued by a trusted certificate authority. Once the connection is established and verified, the padlock icon is displayed to indicate that the connection is secure and the user's data is protected.`,
            },
            {
                question: "What is Same Origin Policy and CORS?",
                answer: `The Same Origin Policy is a security measure implemented by web browsers that prevents scripts from different domains from accessing each other's data. This helps to prevent cross-site scripting (XSS) and other attacks. 
                    
The Cross-Origin Resource Sharing (CORS) mechanism is a way to relax the Same Origin Policy by allowing servers to specify which origins are allowed to access their resources.
                    
CORS allows web applications to make cross-origin requests and enables APIs to be accessed from web pages hosted on different domains. However, improper CORS configuration can also introduce security vulnerabilities, such as allowing unauthorized access to sensitive data.`,
            },
        ],
    },
    {
        id: 4,
        title: "Databases",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "How would you secure a Mongo database?",
                answer: `To secure a Mongo database, one can start by enabling access control and setting up strong authentication mechanisms.
                
It's also important to limit network exposure, implement encryption for data in transit, and regularly update the database with security patches. Additionally, it's recommended to follow the principle of least privilege by restricting user access to only the necessary functions and data within the database.`,
            },
            {
                question: "Postgres?",
                answer: `Securing a Postgres database involves similar measures as securing a Mongo database, such as enabling access control, strong authentication, and encryption for data in transit. 
                
Additional measures include regularly updating the database with security patches and using secure communication protocols like SSL/TLS. It's also important to monitor database activity and implement backup and recovery processes to prevent data loss.`,
            },
            {
                question:
                    "Our DB was stolen/exfiltrated. It was secured with one round of sha256 with a static salt?, What do we do now?, Are we at risk?, What do we change?",
                answer: `If a database secured with one round of sha256 with a static salt is stolen, it's likely that the attacker will be able to easily crack the password. 
                
In this case, it's important to notify affected parties and consider implementing stronger security measures, such as using a stronger hashing algorithm like bcrypt or scrypt, implementing multi-factor authentication, and regularly updating passwords and security protocols. It's also recommended to conduct a thorough security audit to identify and address any vulnerabilities.`,
            },
            {
                question: "What are the 6 aggregate functions of SQL?",
                answer: `The six aggregate functions of SQL are COUNT, SUM, AVG, MAX, MIN, and GROUP BY. COUNT returns the number of rows in a table, SUM returns the sum of a column, AVG returns the average of a column, MAX returns the maximum value in a column, MIN returns the minimum value in a column, and GROUP BY groups rows that have the same values into summary rows, like finding the total sales by region or by year.`,
            },
        ],
    },
    {
        id: 5,
        title: "ReconTools and Games",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "Have I played CTF?",
                answer: `Yes, I have played CTF (Capture the Flag) competitions. These are cybersecurity competitions where participants solve challenges related to various security domains, such as cryptography, web exploitation, reverse engineering, etc. The goal is to find a flag, which is a secret string hidden in the challenge. 
                
For example, in a cryptography challenge, the flag might be the decrypted message, and in a web exploitation challenge, the flag might be a hidden URL path.`,
            },
            {
                question: "Would you decrypt a steganography image?",
                answer: `Yes, I would decrypt a steganography image. Steganography is the practice of concealing a message or information within another file or message, such as hiding text within an image file. To decrypt a steganography image, one needs to use special software or tools to extract the hidden message or information. 
                
For example, one tool that can be used for steganography analysis is Steghide.`,
            },
            {
                question: "You're given an ip-based phone and asked me to decrypt the message in the phone.",
                answer: `To decrypt a message on an IP-based phone, one needs to identify the encryption algorithm and key used for encryption. Once the algorithm and key are known, the message can be decrypted using the appropriate decryption tool. 
                
For example, if the phone uses the AES encryption algorithm, one could use a tool like John the Ripper to crack the key and then decrypt the message.`,
            },
            {
                question: "What CND tools do you knowledge or experience with?",
                answer: `I have experience with several CND (Computer Network Defense) tools, including but not limited to Wireshark, Snort, Suricata, 
                
Nmap, and Nessus. Wireshark is a packet analyzer that can be used for network troubleshooting and analysis. Snort and Suricata are intrusion detection systems that can be used to detect and prevent network attacks. 

Nmap is a port scanner used for network exploration, and Nessus is a vulnerability scanner that can identify potential vulnerabilities in a network or system.`,
            },
            {
                question: "What is the difference between nmap -ss and nmap -st?",
                answer: `The -ss and -st options in nmap are used for port scanning. The -ss option is used for a TCP SYN scan, which sends a SYN packet to the target port and waits for a response. 
                
The -st option is used for a TCP connect scan, which attempts to establish a full TCP connection with the target port. The difference between the two is that the TCP SYN scan is faster but less accurate, while the TCP connect scan is slower but more reliable.`,
            },
            {
                question: "How would you filter xyz in Wireshark?",
                answer: `To filter for a specific protocol or traffic in Wireshark, one can use display filters. For example, to filter for HTTP traffic, one would use the filter "http". 
                
To filter for a specific IP address, one would use the filter "ip.addr == x.x.x.x". To filter for a specific port, one would use the filter "tcp.port == xxx".`,
            },
            {
                question:
                    "Given a sample packet capture - Identify the protocol, the traffic, and the likelihood of malicious intent. ",
                answer: `To identify the protocol and traffic in a packet capture, one can analyze the packet headers and payloads using tools like Wireshark.
                 
Wireshark can identify the protocol, source and destination IP addresses, source and destination ports, and other metadata for each packet. 
                
To determine the likelihood of malicious intent, one would need to analyze the traffic for suspicious patterns, anomalies, or known attack signatures.`,
            },
            {
                question: "If left alone in office with access to a computer, how would you exploit it?",
                answer: `As an AI language model, I cannot condone or encourage unethical or illegal activities. It is important to adhere to company policies and ethical standards in any situation. 
                    
If any vulnerabilities are discovered, they should be reported to the relevant security personnel or IT department to address them in a responsible and professional manner.`,
            },
            {
                question: "How do you fingerprint an iPhone so you can monitor it even after wiping it?",
                answer: `Fingerprinting an iPhone after wiping it can be achieved through a few methods such as: using device enrollment program (DEP) or mobile device management (MDM) to install a profile which enables remote management, enabling Find My iPhone before wiping, or using tools such as GrayKey to extract data from the device's firmware. 
                    
These methods require advanced technical knowledge and may not be ethical or legal in certain situations.`,
            },
            {
                question: "How would you use CI/CD to improve security?",
                answer: `CI/CD can improve security by implementing automated security checks and testing at every stage of the development pipeline, ensuring that security vulnerabilities are identified and addressed early in the development cycle. 
                    
This includes automated scanning for vulnerabilities, code analysis, and penetration testing. Examples of CI/CD tools used for security include Jenkins, GitLab CI/CD, and AWS CodePipeline.`,
            },
            {
                question:
                    "You have a pipeline for Docker images. How would you design everything to ensure the proper security checks?",
                answer: `To ensure proper security checks in a Docker image pipeline, I would implement multiple security layers such as image scanning and vulnerability analysis tools, identity and access management, secure code signing, and network security measures. 
                    
Examples of tools for Docker security include Aqua Security, Docker Security Scanning, and Sysdig Secure. It is also important to ensure that all containers and images are updated regularly with the latest security patches.`,
            },
            {
                question: "How would you create a secret storage system?",
                answer: `To create a secret storage system, I would recommend using encryption tools such as AES or RSA to encrypt data at rest and in transit, using secure key management and access control measures, and implementing secure backup and disaster recovery procedures. 
                    
Examples of secret storage systems include HashiCorp Vault, AWS Secrets Manager, and Azure Key Vault. It is also important to ensure that all passwords and credentials are stored securely and that access is restricted to authorized personnel only.`,
            },
            {
                question: "What technical skill or project are you working on for fun in your free time?",
                answer: `As an AI language model, I do not have free time or interests outside of my programmed tasks. 
                    
However, some popular technical projects for hobbyists include building custom Raspberry Pi projects, developing mobile apps or games, creating websites or web applications, or experimenting with artificial intelligence and machine learning models.`,
            },
            {
                question: "How would you harden your work laptop if you needed it at Defcon?",
                answer: `To harden a work laptop for Defcon, I would recommend implementing multiple layers of security such as using a VPN, firewalls, anti-virus software, and encryption tools. 
                    
It is also important to disable unnecessary services, keep the system up to date with the latest security patches, and avoid connecting to unsecured networks. Additionally, physical security measures such as using a privacy screen and locking the laptop when not in use can also help prevent unauthorized access.`,
            },

            {
                question: "If you had to set up supply chain attack prevention, how would you do that?",
                answer: `To prevent supply chain attacks, a few best practices should be implemented. First, supply chain partners should be carefully vetted for security protocols and compliance. 
                
Second, multi-factor authentication and strong access controls should be implemented to secure accounts and limit unauthorized access. 

Third, regular security assessments should be conducted to identify vulnerabilities and reduce risk.
                
Fourth, encryption should be used for sensitive data in transit and at rest. Finally, monitoring and logging should be used to detect and respond to potential threats in real-time. For example, implementing supply chain security standards like NIST 800-161 and conducting thorough audits can help organizations protect themselves against supply chain attacks.`,
            },
        ],
    },
    {
        id: 6,
        title: "Programming and Code",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "Code review a project and look for the vulnerability.",
                answer: `During a code review, it's important to look for any potential vulnerabilities that could lead to security breaches. One example of a vulnerability is the use of unvalidated user input in a web application, which could lead to SQL injection attacks or cross-site scripting (XSS) attacks. 
                
Another example is the use of weak encryption algorithms, which could make it easier for attackers to access sensitive data. It's important to thoroughly review the code and identify any potential vulnerabilities, and then work to implement fixes to address them.`,
            },
            {
                question: "How would you conduct a security code review?",
                answer: `To conduct a security code review, it's important to follow a structured process that includes both manual and automated techniques. 
                
This might involve using tools to scan for known vulnerabilities, reviewing the code for potential security issues, and performing penetration testing to identify potential weaknesses. 

It's also important to understand the context in which the code is being used, such as the intended audience and the types of attacks that might be most likely to occur. Throughout the review process, it's important to document any vulnerabilities that are found and work to address them.`,
            },
            {
                question: "How can Github webhooks be used in a malicious way?",
                answer: `Github webhooks can be used to trigger actions on a victim's system if the webhook payload is manipulated. Malicious actors can send a specially crafted payload that can execute arbitrary code on the victim's system, allowing them to take control of the system or steal sensitive data. 
                    
For example, an attacker can modify a webhook payload to include a malicious script that, when executed, installs malware on the victim's system.`,
            },
            {
                question: "Given a CVE, walk us through it and how the solution works.",
                answer: `A CVE, or Common Vulnerabilities and Exposures, is a unique identifier for a specific security vulnerability. The solution to a CVE depends on the nature of the vulnerability. 
                    
For example, if the CVE is related to a software vulnerability, the solution may involve a patch or update that fixes the vulnerability. If the CVE is related to a configuration issue, the solution may involve updating configuration settings or adding additional security controls. 

It is important to regularly monitor and address CVEs to reduce the risk of a security breach.`,
            },
            {
                question: "Tell me about a repetitive task at work that you automated away.",
                answer: `One repetitive task that I automated away was data entry. I created a Python script that automated the process of entering data into a spreadsheet by pulling information from various sources and inputting it into the appropriate fields. 
                    
This reduced the time spent on data entry by more than 50%, allowing me to focus on more complex tasks. Additionally, it minimized the risk of errors that can occur with manual data entry, resulting in more accurate data and analysis.`,
            },
        ],
    },
    {
        id: 7,
        title: "Compliance",
        level: "Beginner",
        desc: "Step by step guide to learn Cyber Security",
        details: [
            {
                question: "Can you explain SOC 2?",
                answer: `SOC 2 is a type of audit report that assesses the controls at a service organization relevant to security, availability, processing integrity, confidentiality, and privacy. 
                
It is based on the Trust Service Criteria and is designed for service providers that store customer data in the cloud. It helps organizations demonstrate their commitment to security and privacy by ensuring they have the appropriate controls in place to protect customer data.`,
            },
            {
                question: "What are the five trust criteria?",
                answer: `The five trust criteria are security, availability, processing integrity, confidentiality, and privacy. 
                
These criteria were developed by the American Institute of Certified Public Accountants (AICPA) and form the basis of SOC 2 audits. The criteria are used to evaluate whether a service organization has the necessary controls in place to ensure the security, availability, and confidentiality of customer data.`,
            },
            {
                question: "How is ISO27001 different?",
                answer: `ISO27001 is a standard that provides a framework for an information security management system (ISMS). It provides a systematic approach for managing and protecting sensitive information by implementing a risk management process. 
                
It differs from SOC 2 in that it is not an audit report but rather a certification that an organization can obtain to demonstrate that it has implemented an effective ISMS.`,
            },
            {
                question: "Can you list examples of controls these frameworks require?",
                answer: `Examples of controls that these frameworks require include access controls, monitoring and logging, vulnerability management, incident response, physical security, and encryption. 
                
Specific controls may vary depending on the framework and the organization's industry and size.`,
            },
            {
                question: "What is the difference between Governance, Risk and Compliance?",
                answer: `Governance refers to the policies, procedures, and controls that an organization puts in place to manage its activities and ensure they are aligned with its objectives. 
                
Risk management involves identifying, assessing, and mitigating risks that could impact the organization's objectives. Compliance refers to adhering to laws, regulations, and industry standards that are relevant to the organization's activities.`,
            },
            {
                question: "What does Zero Trust mean?",
                answer: `Zero Trust is a security model that assumes that all users, devices, and applications are untrusted and must be verified before being granted access to resources. 
                
It requires strong authentication and authorization mechanisms and continuous monitoring of network activity to detect and respond to threats. Zero Trust is based on the principle of 'never trust, always verify.`,
            },
            {
                question: "What is role-based access control (RBAC) and why is it covered by compliance frameworks?",
                answer: `Role-based access control (RBAC) is a method of restricting access to resources based on the roles that users have in an organization.

RBAC is covered by compliance frameworks because it is a key control for ensuring that users have the appropriate level of access to sensitive information and that access is restricted to only those who need it to perform their job duties.`,
            },
            {
                question: "What is the NIST framework and why is it influential?",
                answer: `The NIST Cybersecurity Framework is a set of guidelines for improving cybersecurity in critical infrastructure organizations. It provides a common language for organizations to communicate about cybersecurity risk and helps them identify, assess, and manage those risks.
                
It is influential because it has been widely adopted by organizations of all sizes and industries and is recognized as a best practice for managing cybersecurity risk.`,
            },
        ],
    },
];

export default InterviewsQuestionsData;
