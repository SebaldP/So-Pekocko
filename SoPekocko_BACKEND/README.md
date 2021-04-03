## Lancement du serveur

1. "npm i"
2. "npm start"

## OWASP TOP 10

1. Injection

Insertion de lignes de code à la place de données (String, Number)

2. Broken Authentification/ Session Management

L’application est vulnérable à une attaque si un utilisateur malveillant peut obtenir un accès non autorisé aux mots de passe, clés et jetons pour pirater la session d’un autre utilisateur. Appréhendez donc l’utilisation de cookies: petite donnée envoyée depuis un site web et stockée sur l’ordinateur de l’utilisateur par un navigateur web lorsque l’utilisateur navigue.

3. Sensitive Data Exposure

Si les données ne sont pas chiffrées, elles ne sont pas sécurisées et peuvent être récupérées lorsqu’elles sont en transit.

4. XML External Entities (XXE)

5. Broken Access Control

6. Security Misconfiguration

Une mauvaise configuration de sécurité est le plus souvent observée dans les en-têtes HTTP qui permettent de donner des indications sur la configuration du serveur, ou via la gestion des exceptions par défaut.

7. Cross-site Scripting (XSS)

8. Insecure Deserialization

Une vulnérabilité de type “insecure deserialisation” permet à un utilisateur malveillant d’accéder et de modifier les fonctionnalités de l’application ciblée.

9. Using Components with Known Vulnerabilities

Même si votre application est sécurisée, vous devez vous assurer que le framework, les bibliothèques, les appels API et la plateforme que vous utilisez ne sont pas vulnérables.

10. Insufficient Logging and Monitoring
