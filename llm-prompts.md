Lien ChatGPT :

https://chatgpt.com/share/677e8ca9-ece8-8005-a66b-f813761a3620

J'ai commencé par lui dire qui il était (un professionnel de react-native sous expo avec typescript) de sorte à ce qu'il me réponde de manière plus juste

Je lui ai régulièrement rappelé le code des pages dont je souhaitais la modification pour ne pas qu'il se mélange les pinceaux

----

Je lui ai demandé de me faire le splash screen, j'ai installé les dépendances et ça a fonctionné.

Je lui ai demandé où se trouvait un fichier précis dans l'arborescence de base du setup, j'ai compris que le fichier avait été renommé au fur et à mesure des mises à jour de React Native et que App.tsx se trouvait maintenant sous le nom de _layout.tsx.

Je lui ai demandé de faire en sorte que la durée du splash screen soit plus longue.

Ensuite, je lui ai demandé : "Je veux maintenant que lorsque je suis sur ma page index, tu récupères l'information du niveau de batterie du téléphone et que tu changes la couleur du fond si la batterie est à plus de 50%."

Le problème ici est qu'il m'a orienté vers la lib react-native-device-info, or je voulais utiliser la lib expo-battery. Je lui ai ensuite demandé de faire les bons changements par rapport aux couleurs selon le pourcentage de batterie.

Je lui ai ensuite demandé de modifier ma page principale pour définir les routes (chat, chien, map, counter, quitter) afin de pouvoir y accéder.

Je lui ai demandé de modifier les icônes pour qu'elles correspondent à notre besoin.

Je suis passé ensuite au contenu des pages. J'ai commencé par la page chat, où je lui ai demandé de me centrer l'image.

Je suis ensuite passé au système de son lorsque l'on clique sur l'image : je veux que si je clique sur l'image du chat, un son de chat se lance (en lui rappelant quelle page modifier). Il m'a conseillé une lib que je ne connaissais pas, mais qui fonctionne très bien (expo-av).

Je suis ensuite passé à la page du chien : lorsque je clique sur le chien, je veux que cela me prépare un SMS avec le texte "Je n'aime pas les chats" à envoyer au numéro 0606060606. Il m'a tout fait correctement.

Je suis ensuite passé à la page map : je veux que sur cette page, il y ait une MapView qui affiche la position actuelle du téléphone avec un zoom pour pouvoir voir toute la France. Il m'a tout fait correctement (j'ai juste un peu modifié le zoom pour coller un minimum à la demande).

Ensuite, la page counter : je veux maintenant une page compteur qui contient "Chat : (nombre de clics sur l'image du chat)" et "Chien : (nombre de clics sur l'image du chien)". Je veux également avoir un bouton pour réinitialiser les compteurs.

Ces valeurs seront stockées dans un AsyncStorage, de sorte à ce que je puisse les retrouver lors de la prochaine réouverture de l'application.

Au début, il m'avait créé un compteur sur les pages chat et chien, or je voulais les compteurs uniquement sur la page counter. Je lui ai demandé de faire ça, et ça a fonctionné. Le problème est que les compteurs ne se mettaient pas à jour. Je lui ai fait part de mon problème et il me l'a réglé.

Pour finir, j'avais un problème avec l'AsyncStorage. Je lui ai rappelé ce que je voulais faire : en fait, la page chien doit uniquement faire +1, en partant de la valeur actuelle de l'AsyncStorage. À chaque clic, il faut récupérer la bonne valeur mise à jour de l'AsyncStorage. Il a réglé mon problème, je lui ai ensuite demandé de faire pareil pour la page chat, et le tout fonctionne !