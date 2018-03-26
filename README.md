# recordplayer.fm

Play your record collection (via your Discogs collection) as if you had ripped all of it to iTunes.

This is currently going through bug testing and some optimization for more people to use it.

Built on a Node.JS Express backend and a React front end.

You create an account, link it to your [Discogs](http://www.discogs.com) account via OAuth authentication. The server then spawns a process that starts parsing your releases, adding any releases not already downloaded to the database, and associating the ones that do exist to the user's collection.

It takes a little time to sync, but your library becomes available to you over the next few minutes. You can then play the songs and organize them in playlists a la your favorite music player.
