//work on getting our access token
const getAuth = async () => {
    const clientId = "b54542ef40e3418da0436f996011d100";
    const clientSecret = "ec314f7bffb9449d9ddb49228698046f";
    const response = await fetch('https://accounts.spotify.com/api/token',
    {
        method : 'POST',
        headers : {
            'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : 'grant_type=client_credentials' 
    });
    const token = await response.json();
    console.log(token);
    return token.access_token
}

const getSong = async (songname, artist, token) => {
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=track:${songname}+artist:${artist}`,{
    method: 'GET',
    headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${token}`
    }
    });
    let data = await response.json();
    console.log(data);
    console.log(data.tracks.items[0]);
    return data.tracks.items[0]
}

getSong('flowers', 'miley')

let music = [
    {id:0, track: 'flowers', artist: 'miley'},
    {id:1, track: 'flowers', artist: 'miley'},
    {id:2, track: 'flowers', artist: 'miley'},
    {id:3, track: 'flowers', artist: 'miley'},
    {id:4, track: 'flowers', artist: 'miley'},
    {id:5, track: 'flowers', artist: 'miley'},
    {id:6, track: 'flowers', artist: 'miley'},
    {id:7, track: 'flowers', artist: 'miley'},
    {id:8, track: 'flowers', artist: 'miley'}
];

let playing;
let stopbtn = document.getElementById('stopbtn');
let headertitle = document.getElementById('headertitle');

const setupTrackList = async () => {
    const token = await getAuth();
    for (let i = 0; i < music.length; i++){

        let data = await getSong(music[i].track, music[i].artist, token);
        music[i]['preview_url'] = new Audio(data.preview_url);
        music[i]['album_cover'] = data.album.images[0].url;

        let img = document.getElementById(`${i}`);
        img.src = music[i].album_cover;
        img.hidden = false;
    }
}
setupTrackList();

let clickEvent = (id) => {
    console.log(id);
    let track = music[id.slice(-1)];
    console.log(track);

    if (playing && !playing.preview_url.paused){
        if (playing == track) {
            pauseTrack();
            return
        }
        else{
            playing.preview_url.pause();
            let playingBtn = document.getElementById(`playbtn${playing.id}`);
            playingBtn.innerHTML = 'Play';
        }
    }


    console.log(`PlAYING-----> ${track.track} by ${track.artist}... `)
    track.preview_url.play();
    playing = track;
    let playingBtn = document.getElementById(`playbtn${id}`);
    playingBtn.innerHTML = 'PAUSE';
    playingBtn.className = 'btn btn-dark';

    stopbtn.innerHTML = 'PAUSE';
    headertitle.innerHTML = `${track.track} by ${track.artist}`;

}

let pauseTrack = () => {
    console.log('Pause... ');
    playing.preview_url.pause();

    let playingBtn = document.getElementById(`playbtn${playing.id}`)
    playingBtn.innerHTML = 'PLAY';
    stopbtn.innerHTML = 'Nothing playing';

}