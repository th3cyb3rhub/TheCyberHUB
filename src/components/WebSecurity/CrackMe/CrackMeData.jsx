export const crackmeLabData = [
    {
        id: 1,
        title: "Crackme Lab 1",
        description: "Crackme lab to test basic password checking.",
        code: `
your_input = ""

if your_input == "Hello_World":
    print("Good Job!")
else:
    print("Wrong Password")
    `,
        answer: "Hello_World",
        hint: "The password is a simple string.",
        solution: ["The password is 'Hello_World'."],
        language: "python",
        category: "Python",
        tags: ["Crackme", "Python", "Password"],
        level: "Beginner",
    },
    {
        id: 2,
        title: "Crackme Lab 2",
        description: "Crackme lab to test password decryption.",
        code: `
your_input = ""
password = ""
intPass = "83,117,112,101,114,83,101,99,117,114,\
101,80,97,115,115,119,111,114,100,87,104,105,99,\
104,67,97,110,116,66,101,67,114,97,99,107,101,100,\
87,105,116,104,111,117,116,66,108,97,99,107,109,97,\
103,105,99"

intPass = intPass.split(",")

for c in intPass:
    password = password + chr(int(c))

if your_input == password:
    print("Good job!")
else:
    print("Wrong password")
    `,
        answer: "SuperSecurePasswordWhichCantBeCrackedWithoutKey",
        hint: "The password is a long string.",
        solution: ["The password is 'SuperSecurePasswordWhichCantBeCrackedWithoutKey'."],
        language: "python",
        category: "Python",
        tags: ["Crackme", "Python", "Password"],
        level: "Intermediate",
    },
    {
        id: 3,
        title: "Crackme Lab 3",
        description: "Crackme lab to test reverse engineering.",
        code: `
#include <stdio.h>
#include <string.h>

int main() {
    char password[] = "p@ssw0rd";
    char input[20];

    printf("Enter password: ");
    gets(input);

    if (strcmp(input, password) == 0)
        printf("Access granted!");
    else
        printf("Access denied!");

    return 0;
}
    `,
        answer: "p@ssw0rd",
        hint: "The password is a simple string.",
        solution: ["The password is 'p@ssw0rd'."],
        language: "c",
        category: "C",
        tags: ["Crackme", "C", "Password"],
        level: "Beginner",
    },
    {
        id: 4,
        title: "Crackme Lab 4",
        description: "Crackme lab to test encryption algorithms.",
        code: `
#include <stdio.h>

int main() 
{
    char encrypted[] = {98, 85, 86, 116, 85, 86, 87, 122, 90, 109, 86, 117, 101, 87, 120, 100, 50, 70, 104, 90, 50, 108, 48, 97, 72, 82, 48, 90, 50, 82, 104, 99, 109, 85, 61, 0};
    char key = 'k';
    int i;

    for (i = 0; encrypted[i] != '\0'; ++i) 
    {
        encrypted[i] = encrypted[i] ^ key;
    }

    printf("Decrypted string: %s", encrypted);
    return 0;
}
    `,
        answer: "Hello, World! This is a secret message.",
        hint: "The message is a simple string.",
        solution: ["The message is 'Hello, World! This is a secret message.'"],
        language: "c",
        category: "C",
        tags: ["Crackme", "C", "Encryption"],
        level: "Advanced",
    },
    {
        id: 5,
        title: "Crackme Lab 5",
        description: "Crackme lab to test buffer overflow vulnerability.",
        code: `
#include <stdio.h>
#include <string.h>

void vulnerableFunction(char *input) 
{
    char buffer[10];
    strcpy(buffer, input);
}

int main() 
{
    char input[20];
    printf("Enter your input: ");
    gets(input);
    vulnerableFunction(input);
    printf("Input processed successfully.\n");
    return 0;
}
    `,
        answer: "A" * 11,
        hint: "The input is a string of length 11.",
        solution: ["The input is 'A' * 11."],
        language: "c",
        category: "C",
        tags: ["Crackme", "C", "Buffer Overflow"],
        level: "Intermediate",
    },
    {
        id: 6,
        title: "Crackme Lab 6",
        description: "Crackme lab to test SQL injection vulnerability.",
        code: `
import sqlite3

def authenticate(username, password):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
    c.execute(query)
    result = c.fetchone()
    conn.close()
    return result

def main():
    username = input("Enter username: ")
    password = input("Enter password: ")
    result = authenticate(username, password)
    if result:
        print("Authentication successful.")
    else:
        print("Authentication failed.")

if __name__ == "__main__":
    main()
    `,
        answer: "admin'--",
        hint: "The username is a simple string.",
        solution: ["The username is 'admin'."],
        language: "python",
        category: "Python",
        tags: ["Crackme", "Python", "SQL Injection"],
        level: "Intermediate",
    },
    {
        id: 7,
        title: "Crackme Lab 7",
        description: "Crackme lab to test basic password checking.",
        code: `
using System; 
class TheCyberHub 
{ 
    public static void Main() 
    { 
        string your_input = "";
		char[] array = your_input.ToCharArray();
		string[] array2 = new string[array.Length];
		string enc = "";
		string correct = "6671766260787562418061";

		for (int i = 0; i < your_input.Length; i++)
		{
			array2[i] = Convert.ToString((int)array[i] - 39);
			enc += array2[i];
		}

		if (enc == correct)
			Console.WriteLine("Good job!");
		else
			Console.WriteLine("Wrong Answer!");
     }
}
    `,
        language: "C#",
        category: "C#",
        answer: "insecurePwd",
        hint: "review the for loop",
        solution: [
            "seperate the value of correct by two palces",
            "add 39 to each",
            "now convert them ascii codes to their respective character",
        ],
        tags: ["Crackme", "C#", "Password"],
        level: "Beginner",
    },
    {
        id: 8,
        title: "Crackme Lab 8",
        description: "Crackme lab to test basic password checking.",
        code: `
import pwn 
password= bytes.fromhex("3a2a2e1e3659113a5f1a3c335d1b1a3a2d590d031b5b064413")
your_input = "" 

enc_password = pwn.xor(password, your_input)

if "TCM{X0r_1s" in str(enc_password):
  print("Good Job!")
else:
  print("Wrong password")
    `,
        language: "python",
        category: "Python",
        answer: "nice",
        hint: "read about how xor works",
        solution: ["reverse the xor", "do TCM{X0r_ls xor password"],
        tags: ["Crackme", "Python", "Password"],
        level: "Beginner",
    },
    {
        id: 9,
        title: "Crackme Lab 9",
        description: "Crackme lab to test basic password checking.",
        code: `                            
int KEY = 3;

char *x1(char *string){
    int x1a;
    char *enc = malloc(strlen(string) + 1);
    for (x1a = 0; x1a < strlen(string); x1a++){
         enc[x1a] = string[x1a] ^ (int)KEY;

    }
    enc[x1a] = '\0';
    return enc;
}

char *r1(int num2, char *string2){
    int x2a;
    char x2b;
    char *enc2 = malloc(strlen(string2) + 1);
    for (x2a = 0; x2a < strlen(string2); x2a++){
        x2b = string2[x2a];
        if((x2b + num2) <= 'z'){
            enc2[x2a] = x2b+ num2;
            }
        else{
            enc2[x2a] = x2b - num2;
        }
    }
         enc2[x2a] = '\0';
         return enc2;
}

int main() 
{
    int i1;
    char your_first_input[9];
    char your_second_input[4];
    
    char sc[] = "Gurplore";
    
    printf("\n\n Username: ");
    scanf(" %s", your_first_input);
    char *enc = x1(your_first_input);
    if (strcmp(enc, sc) == 0)
    {
        printf("Password: ");
    }
    else
    {
        printf("Wrong Username");
        exit(0);
    }

    scanf(" %s", your_second_input);
    
    char *enc2= r1((15 % 4) * 4 + 1, your_second_input);
    if(strcmp(enc2, "kva") == 0)
    {
        char *secret1 = x1(enc2);
        char *secret2 = r1(KEY * 4 + 1, enc);
        printf("\n\n You flag is : %s%s", secret2, secret1);
    }
    else
    {
        printf("Wrong Password");
        exit(0);
    }
}                         
    `,
        language: "c",
        category: "C",
        answer: "Thecyberhub",
        hint: "do some calculations",
        solution: ["xor 'Gurplore' with the KEY to get the username", "rot13 'kva' to get password"],
        tags: ["Crackme", "C", "Password"],
        level: "Intermediate",
    },
    {
        id: 10,
        title: "Crackme Lab 10",
        description: "Crackme lab to test basic password checking.",
        code: `                                
your_input = ""
password = list(bytes(your_input,encoding='utf-8'))

check = (password[0] + 29 == 150) and (password[1] + 39 == 150) and (password[2] + 33 == 150)\
	and (password[3] + 105 == 150) and (password[4] + 47 == 150) and (password[5] + 39 == 150)\
	and (password[6] + 34 == 150) and (password[7] + 105 == 150) and (password[8] + 34 == 150)\
	and (password[9] + 46 == 150) and (password[10] + 49 == 150) and (password[11] + 105 == 150)\
	and (password[12] + 31 == 150) and (password[13] + 36 == 150) and (password[14] + 45 == 150)\
	and (password[15] + 34 == 150) and (password[16] + 49 == 150) and (password[17] + 105 == 150)\
	and (password[18] + 53 == 150) and (password[19] + 40 == 150) and (password[20] + 35 == 150)\
	and (password[21] + 31 == 150) and (password[22] + 49 == 150) and (password[23] + 36 == 150)

if (check == True):
	print("Good Job!")

else:
	print("Wrong Password")                     
    `,
        language: "python",
        category: "Python",
        answer: "you-got-the-write-answer",
        hint: "do some subtraction",
        solution: [
            "subtract the added number from 150",
            "now convert the ascii codes to their respective character values",
        ],
        tags: ["Crackme", "Python", "Password"],
        level: "Intermediate",
    },

    {
        id: 11,
        title: "Crackme Lab 11",
        description: "Crackme lab to test basic password checking.",
        code: `#include <stdio.h>

int main() 
{

    char your_input[10] = "";

	int j, i = 0;
	char Grey[10], Black[] = "zlBnStao024GeliI", White[] = "dbrWqmL8wShk5jfduU8";

	if (strlen(your_input) != 10 || your_input[0] != Black[13])
	{
		printf("Wrong Input");
		exit(0);
	}

	for (j = 9; j >= 0; j--)
	{
	    Grey[i] = your_input[j];
		i++;
	}
	Grey[j] = '\0';
	if ((Grey[0] == White[5]) && (Grey[7] == White[6]) && (Grey[1] == White[10]) && (Grey[6] == Black[11]) && (Grey[2] == Black[5]) && (Grey[5] == Black[7]) && (Grey[3] == Black[14]) && (Grey[4] == White[2]) && (Grey[8] == Black[8]))
	{
		printf("Good Job!");
	}
	else
	{
		printf("Wrong Answer");
	}
}
                            
    `,
        language: "c",
        category: "C",
        answer: "l0LGorithm",
        hint: "something is reversed",
        solution: [
            "find each index of grey carefully from the strings Black and White",
            "Reverse the string and add Black[13] on 0th index",
        ],
        tags: ["Crackme", "C", "Password"],
        level: "Beginner",
    },

    {
        id: 12,
        title: "Crackme Lab 12",
        description: "Crackme lab to test basic password checking.",
        code: `                          
import hashlib

def custom_hash(text):
    sha256 = hashlib.sha256()
    sha256.update(text.encode('utf-8'))
    return sha256.hexdigest()

def verify_key(key):
    if len(key) != 9 :
        return False
    
    part1 = key[:4]
    part2 = key[5:]
    
    hash1 = custom_hash(part1)
    hash2 = custom_hash(part2)
    
    target_hash1 = "9048b350dad978fb4365f9ebf3520ae3f4897e90634c7720e3b87cbcadc85aee"   
    target_hash2 = "881fd197f93010ce660d5fa9a5cb3664fb084300371927b3eecaf22ca56aaf47"
    
    if hash1 == target_hash1 and hash2 == target_hash2:
        return True
    else:
        return False

if __name__ == "__main__":

    your_input = ""
    
    if verify_key(your_input):
        print("Good Job !")
    else:
        print("Wrong answer")                       
    `,
        language: "python",
        category: "Python",
        answer: "(~~>_<~~)",
        hint: "dehash it",
        solution: ["dehash the hashes with combination of special characters"],
        tags: ["Crackme", "Python", "Password"],
        level: "Advanced",
    },

    {
        id: 13,
        title: "Crackme Lab 13",
        description: "Crackme lab to test basic password checking.",
        code: `                        
<?php

$your_input = "";

$txt = str_replace("Wi","",str_replace("ck","",str_replace("ty","",str_replace("ac","",$your_input))));

if($txt === "WittyHack")
  echo ("Good job!");
else
  echo ("Wrong Answer!");
?>                            
	`,
        language: "php",
        category: "PHP",
        answer: "WWiitttyyHaaccckk",
        hint: "try bypassing str_replace",
        solution: ["WWiitttyyHaaccckk is the correct answer"],
        tags: ["Crackme", "PHP", "Password"],
        level: "Beginner",
    },
];
