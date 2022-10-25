import React from "react";
import { InterviewQuestionSection, ListContent, List } from "./InterviewQuestionsElements";
import { Heading } from "../../Learn/Roadmaps/RoadmapsElements";

const InterviewQuestions = () => {
  return (
    <InterviewQuestionSection>
      <Heading> Encryption and Authentication </Heading>
      <ListContent>
        <List> What is a three-way handshake?</List>
        <List> How do cookies work?</List>
        <List> How do sessions work?</List>
        <List> Explain how OAuth works.</List>
        <List> What is a public key infrastructure flow and how would I diagram it?</List>
        <List> Describe the difference between synchronous and asynchronous encryption.</List>
        <List> Describe SSL handshake.</List>
        <List> How does HMAC work?</List>
        <List> Why HMAC is designed in that way?</List>
        <List> What is the difference between authentication vs authorization name spaces?</List>
        <List> What’s the difference between Diffie-Hellman and RSA?</List>
        <List> How does Kerberos work?</List>
        <List> If you're going to compress and encrypt a file, which do you do first and why?</List>
        <List> How do I authenticate you and know you sent the message?</List>
        <List> Should you encrypt all data at rest?</List>
        <List> What is Perfect Forward Secrecy?</List>
      </ListContent>

      <Heading> Network Level and Logging </Heading>
      <ListContent>
        <List> What are common ports involving security, what are the risks and mitigations?</List>
        <List> Which one for DNS?</List>
        <List> Describe HTTPs and how it is used.</List>
        <List> What is the difference between HTTPS and SSL?</List>
        <List> How does threat modeling work?</List>
        <List> What is a subnet and how is it useful in security?</List>
        <List> What is subnet mask?</List>
        <List> Explain what traceroute is.</List>
        <List> Draw a network, then expect them to raise an issue and have to figure out where it happened.</List>
        <List>
          {" "}
          Write out a Cisco ASA firewall configuration on the white board to allow three networks unfiltered access, 12
          networks limited access to different resources on different networks, and 8 networks to be blocked altogether.
        </List>
        <List> Explain TCP/IP concepts.</List>
        <List> What is OSI model?</List>
        <List> How does a router differ from a switch?</List>
        <List>
          {" "}
          Describe the Risk Management Framework process and a project where you successfully implemented compliance
          with RMF.
        </List>
        <List> How does a packet travel between two hosts connected in same network?</List>
        <List> Explain the difference between TCP and UDP.</List>
        <List> Which is more secure and why?</List>
        <List> What is the TCP three way handshake?</List>
        <List> What is the difference between IPSEC Phase 1 and Phase 2?</List>
        <List> What are biggest AWS security vulnerabilities?</List>
        <List> How do web certificates for HTTPS work?</List>
        <List> What is the purpose of TLS?</List>
        <List> Is ARP UDP or TCP?</List>
        <List> Explain what information is added to a packet at each stop of the 7 layer OSI model.</List>
        <List>
          {" "}
          Walk through a whiteboard scenario for your environment of choice (Win/Linux) in which compromising the
          network is the goal without use of social engineering techniques (phishing for credential harvesting, etc).
        </List>
        <List>
          {" "}
          Explain how you would build a web site that could secure communications between a client and a server and
          allow an authorized user to read the communications securely.
        </List>
        <List> How does an active directory work?</List>
        <List> Do you know how Single Sign-On works?</List>
        <List> What is a firewall?</List>
        <List> How does it work?</List>
        <List> How does it work in cloud computing?</List>
        <List> Difference between IPS and IDS?</List>
        <List> How do you build a tool to protect the entire Apple infra?</List>
        <List> How do you harden a system?</List>
        <List> How to you elevate permissions?</List>
        <List> Describe the hardening measures you've put on your home network.</List>
        <List> What is traceroute? Explain it in details.</List>
        <List> How does HTTPS work?</List>
        <List> What would do if you discovered an infected host?</List>
        <List> What is SYN/ACK and how does it work?</List>
        <List>
          {" "}
          You got the memory dump of a potentially compromised system, how are you going to approach its analysis?
        </List>
        <List> How would you detect a DDOS attack?</List>
        <List> How does the kernel know which function to call for the user?</List>
        <List> How would you go about reverse-engineering a custom protocol packet?</List>
      </ListContent>

      <Heading> OWASP Top 10, Pentesting and/or Web Applications </Heading>
      <ListContent>
        <List> Differentiate XSS from CSRF.</List>
        <List> What do you do if a user brings you a pc that is acting 'weird'? You suspect malware.</List>
        <List> What is the difference between tcp dump and FWmonitor?</List>
        <List> Do you know what XXE is?</List>
        <List> Explain man-in-the-middle attacks.</List>
        <List> What is a Server Side Request Forgery attack?</List>
        <List> Describe what are egghunters and their use in exploit development.</List>
        <List> How is pad lock icon in browser generated?</List>
        <List> What is Same Origin Policy and CORS?</List>
      </ListContent>

      <Heading> Databases </Heading>
      <ListContent>
        <List> How would you secure a Mongo database?</List>
        <List> Postgres?</List>
        <List> Our DB was stolen/exfiltrated. It was secured with one round of sha256 with a static salt.</List>
        <List> What do we do now?</List>
        <List> Are we at risk?</List>
        <List> What do we change?</List>
        <List> What are the 6 aggregate functions of SQL?</List>
      </ListContent>

      <Heading> Tools and Games </Heading>
      <ListContent>
        <List> Have I played CTF?</List>
        <List> Would you decrypt a steganography image?</List>
        <List> You're given an ip-based phone and asked me to decrypt the message in the phone.</List>
        <List> What CND tools do you knowledge or experience with?</List>
        <List> What is the difference between nmap -ss and nmap -st?</List>
        <List> How would you filter xyz in Wireshark?</List>
        <List>
          {" "}
          Given a sample packet capture - Identify the protocol, the traffic, and the likelihood of malicious intent.
        </List>
        <List> If left alone in office with access to a computer, how would you exploit it?</List>
        <List> How do you fingerprint an iPhone so you can monitor it even after wiping it?</List>
        <List> How would you use CI/CD to improve security?</List>
        <List>
          {" "}
          You have a pipeline for Docker images. How would you design everything to ensure the proper security checks?
        </List>
        <List> How would you create a secret storage system?</List>
        <List> What technical skill or project are you working on for fun in your free time?</List>
        <List> How would you harden your work laptop if you needed it at Defcon?</List>
        <List> If you had to set up supply chain attack prevention, how would you do that?</List>
      </ListContent>

      <Heading> Programming and Code </Heading>
      <ListContent>
        <List> Code review a project and look for the vulnerability.</List>
        <List> How would you conduct a security code review?</List>
        <List> How can Github webhooks be used in a malicious way?</List>
        <List> If I hand you a repo of source code to security audit what’s the first few things you would do?</List>
        <List> Can I write a tool that would search our Github repos for secrets, keys, etc.?</List>
        <List> Slack?</List>
        <List> https://arstechnica.com/security/2016/04/hacking-slack-accounts-as-easy-as-searching-github/</List>
        <List> AWS?</List>
        <List> Etc.</List>
        <List> Given a CVE, walk us through it and how the solution works.</List>
        <List> Tell me about a repetitive task at work that you automated away.</List>
        <List> How would you analyze a suspicious email link?</List>
      </ListContent>

      <Heading> Compliance </Heading>
      <ListContent>
        <List> Can you explain SOC 2?</List>
        <List> What are the five trust criteria?</List>
        <List> How is ISO27001 different?</List>
        <List> Can you list examples of controls these frameworks require?</List>
        <List> What is the difference between Governance, Risk and Compliance?</List>
        <List> What does Zero Trust mean?</List>
        <List> What is role-based access control (RBAC) and why is it covered by compliance frameworks?</List>
        <List> What is the NIST framework and why is it influential?</List>
        <List> What is the OSI model?</List>
      </ListContent>
    </InterviewQuestionSection>
  );
};

export default InterviewQuestions;
