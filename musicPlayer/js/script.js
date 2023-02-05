
let playing = false;    // store the state of player (play/pause)
let jsonData,   // stores json file data 
    playInterval,
    songQueue = [],
    songNumber = 0,
    fileObjList = {},       // to store file variable for after use
    totalFiles = 0;

fetch("data.json").then(r => r.json()).then(e => { jsonData = e });


function _(el) { return document.querySelector(el); }


function playBtn(e) {
    // console.log(e)   // testing

    if (playing) {
        pauseSong();

    } else {
        playSong();

    }
}



function searchTypeActiveFunc() {   // func to set the underLine to active class position
    let a = _("#searchType>.active").getBoundingClientRect()['x'];
    let b = _("#searchType>.active").getBoundingClientRect()['width'];
    _("#searchType").setAttribute("style", `--line-left:${a}px;--line-width:${b}px`)
}

searchTypeActiveFunc()  // call function first to get line on position before hover

Array.from(_("#searchType").children).forEach(element => {

    element.addEventListener('mouseover', e => {    // func to set the underLine to the hover's Button position
        let a = e.target.getBoundingClientRect()['x'];
        let b = e.target.getBoundingClientRect()['width'];
        _("#searchType").setAttribute("style", `--line-left:${a}px;--line-width:${b}px`)
    })
    element.addEventListener('mouseout', e => {
        searchTypeActiveFunc()
    })


})


function activeClassShift(e) {      // func to change to active class
    Array.from(_("#searchType").children).forEach(element => {
        if (element == e) {
            e.classList.add("active");
            _("#searchBarInput").placeholder = `  Search ${e.innerText} `;
        } else {
            element.classList.remove("active");
        }
    })
}


_("#searchBarInput").addEventListener("keyup", e => {
    if (e.key == "Enter") {
        searchBtnFunc(e)    // result only shows when user press enter or search button
    }
})

function searchBtnFunc(e) {
    // console.log(e.key)   // testing
    _(".searchResultDiv").style.display = "block";
    let searchHtml = '';
    let num = 1;

    if (_("#searchBarInput").placeholder.includes("Playlist")) {
        searchHtml += ` <div class="row">
        <div class="rowElement">S.no.</div>
        <div class="rowElement">Name</div>
        <div class="rowElement">Songs</div>
        <div class="rowElement">Popularity</div>
    </div>`


        jsonData.forEach(e => {
            // console.log(e["playlistName"])
            if (e["playlistName"].toLowerCase().includes(_("#searchBarInput").value.toLowerCase())) {
                searchHtml += `     <a onclick="playListClick(this)" class="row result">
<div class="rowElement">${num++}</div>
<div class="rowElement">${e["playlistName"]}</div>
<div class="rowElement">${e["songList"].length}</div>
<div class="rowElement">${e["playlistPopularity"]}</div>
</a>`
            }
        })
    } else {
        searchHtml += ` <div class="row">
        <div class="rowElement">S.no.</div>
        <div class="rowElement">Name</div>
        <div class="rowElement"><i class="fa fa-clock-o"></i></div>
        <div class="rowElement">Popularity</div>
    </div>`

        jsonData.forEach(e => {
            // console.log(e["playlistName"])
            e["songList"].forEach(el => {

                if (el["songName"].toLowerCase().includes(_("#searchBarInput").value.toLowerCase())) {
                    searchHtml += `     <a class="row result" onclick="songClick(this)">
                    <div class="rowElement">${num++}</div>
                    <div class="rowElement">${el["songName"].split(".")[0]}</div>
                    <div class="rowElement">${Math.floor(el["duration"] / 60).toString().padStart(2, '0')}:${Math.floor(el["duration"] % 60).toString().padStart(2, '0')}</div>
                    <div class="rowElement">${el["songPopularity"]}</div>
                    <div class="hiddenPlaylist" style="display:none">${e["playlistName"]}</div>
                    <div class="hiddenLocation" style="display:none">playlists/${e["playlistName"]}/${el["songName"]}</div>
                    </a>`
                }
            })

        })

    }



    _("#searchResultsList").innerHTML = searchHtml;

    // console.log(_("#searchBarInput").value)  // testing

}


function songClick(e) {
    // console.log(e)  //testing
    _("#audioID").src = e.lastElementChild.innerText;
    _("#trackInfo>h4").innerText = e.children[1].innerText;
    _("#endTime").innerText = e.children[2].innerText;

    _("#progressSlider").max = Number(e.children[2].innerText.split(":")[0]) * 60 + Number(e.children[2].innerText.split(":")[1]);

    playSong(); // play song on player

    // console.log(e.children[5].innerText)
    for (let i of jsonData) {
        if (i["playlistName"].toLowerCase().includes(e.children[4].innerText.toLowerCase())) {

            // console.log(i["songList"]);
            songQueue = i["songList"];
            songNumber = 0;
            break;
        }

    }


}

function playSong() {
    playing = true;

    _("#audioID").play();
    _("#play").firstElementChild.setAttribute("class", "fa fa-pause");
    playInterval = setInterval(() => {

        _("#progressSlider").value = _("#audioID").currentTime;     // progress bar value set to the cerrent time of song

        _("#playedTime").innerText = `${Math.floor(_("#progressSlider").value / 60).toString().padStart(2, '0')}:${Math.floor(_("#progressSlider").value % 60).toString().padStart(2, '0')}`;       // formated display played time (06:09)

        if (_("#audioID").currentTime == _("#audioID").duration) {
            // console.log("next");
            nextSong();
        }
    }, 1000);
}

function pauseSong() {
    playing = false;
    clearInterval(playInterval);
    _("#audioID").pause();
    _("#play").firstElementChild.setAttribute("class", "fa fa-play");

}

_("#progressSlider").onchange = e => {      // if user change progress bar value 
    _("#audioID").currentTime = _("#progressSlider").value;     // progress bar value set to the current time of song

    _("#playedTime").innerText = `${Math.floor(_("#progressSlider").value / 60).toString().padStart(2, '0')}:${Math.floor(_("#progressSlider").value % 60).toString().padStart(2, '0')}`;       // formated display played time (06:09)

}

function playListClick(e) {
    // e.classList.toggle("playListExpand");
    // console.log(e.getBoundingClientRect().y)
    // console.log(e.children)
    _(".playlistTray>.playlistHeader>.description>h1").innerText = e.children[1].innerText;
    _(".playlistTray>.playlistHeader>.description>h4").innerText = `${e.children[2].innerText} songs`;

    _(".playlistTray").style.top = `${e.getBoundingClientRect().y}px`;
    _(".playlistTray").style.left = `${e.getBoundingClientRect().x}px`;

    _(".playlistTray").style.display = "block";
    setTimeout(() => {

        _(".playlistTray").classList.add("playListExpand");
    }, 100);


    // songs listing

    let searchHtml = '';
    let num = 1;

    searchHtml += ` <div class="row">
    <div class="rowElement">S.no.</div>
    <div class="rowElement">Name</div>
    <div class="rowElement"><i class="fa fa-clock-o"></i></div>
    <div class="rowElement">Popularity</div>
</div>`

    jsonData.forEach(element => {

        if (element["playlistName"].toLowerCase().includes(e.children[1].innerText.toLowerCase())) {


            element["songList"].forEach(el => {


                searchHtml += `     <a class="row result" onclick="songClick(this)">
                <div class="rowElement">${num++}</div>
                <div class="rowElement">${el["songName"].split(".")[0]}</div>
                <div class="rowElement">${Math.floor(el["duration"] / 60).toString().padStart(2, '0')}:${Math.floor(el["duration"] % 60).toString().padStart(2, '0')}</div>
                <div class="rowElement">${el["songPopularity"]}</div>
                <div class="hiddenPlaylist" style="display:none">${e["playlistName"]}</div>
                <div class="hiddenLocation" style="display:none">playlists/${element["playlistName"]}/${el["songName"]}</div>
                </a>`

            })

        }
    })
    // console.log("done");
    _("#playlistSongsList").innerHTML = searchHtml;

}

function playlistTrayBackBtn(e) {

    _(".playlistTray").classList.remove("playListExpand");
    setTimeout(() => {

        _(".playlistTray").style.display = "none";
    }, 500);

}

function nextSong(e) {
    _("#progressSlider").value = 0;     // progress bar value set to the cerrent time of song
    _("#audioID").currentTime = 0;
    let temp = _("#audioID").src.split("/");
    temp[temp.length - 1] = songQueue[songNumber]["songName"];
    _("#audioID").src = temp.join("/");

    _("#trackInfo>h4").innerText = songQueue[songNumber]["songName"].split(".")[0];
    _("#endTime").innerText = `${Math.floor(songQueue[songNumber]["duration"] / 60).toString().padStart(2, '0')}:${Math.floor(songQueue[songNumber]["duration"] % 60).toString().padStart(2, '0')}`;

    _("#progressSlider").max = songQueue[songNumber]["duration"];
    _("#audioID").play();

    if (songNumber < songQueue.length - 1) {
        songNumber++;
    } else {
        songNumber = 0;
    }
    // console.log(songNumber);    // testing

}


_("#uploaded_file").onchange = () => {
    let innerHTMLList = "";
    // console.log(_("#uploaded_file").files)
    Array.from(_("#uploaded_file").files).forEach(e => {
        // console.log(e);
        let fileSize = e.size / 1000;

        if (fileSize > 10000) {  // if file size is greater than 10MB
            fileSize /= 1000;
            innerHTMLList += `   <div class=" overFlowSize">

            <div>`

            if (fileSize > 1000) {    // if file size is in GBs
                innerHTMLList += `<p class="fileSize">${(fileSize / 1000).toFixed(2)}GB</p>`

            } else {
                innerHTMLList += `<p class="fileSize">${fileSize.toFixed(2)}MB</p>`

            }


            innerHTMLList += `<input type="text" value = "${e.name}">
            </div>
            <button type="button" onclick="cancelFile(this)"><i class="fa fa-trash"></i></button>
            <p class="hiddenValue" style="display:none">${++totalFiles}</p>
    
        </div>`;
            _("#uploadMessage").style.visibility = "visible";
        } else {
            innerHTMLList += `   <div id="fileID${++totalFiles}" class="uploadingFile">

            <div>`

            if (fileSize > 1000) {    // if file size is in MBs
                innerHTMLList += `<p class="fileSize">${(fileSize / 1000).toFixed(2)}MB</p>`

            } else {
                innerHTMLList += `<p class="fileSize">${(fileSize).toFixed(2)}KB</p>`

            }

            innerHTMLList += `<input id="fileNameID${totalFiles}"  type="text" value = "${e.name}">
          
            </div>
            <button type="button" onclick="cancelFile(this)"><i class="fa fa-trash"></i></button>
            <p class="hiddenValue" style="display:none">${totalFiles}</p>

    
        </div>`;
        }

        fileObjList[totalFiles] = e;    // appending file in object with distinct keys

    })
    // console.log(fileObjList);        // testing

    _("#filesList").innerHTML += innerHTMLList;



}

function cancelFile(e) {
    // event.preventDefault();      // event is deprecated
    // console.log(e.parentElement)
    e.parentElement.style.scale = 0;    // small down transition
    delete fileObjList[e.parentElement.lastElementChild.innerText];     // delete file from the list of uploading obj

    setTimeout(() => {
        _("filesList").removeChild(e.parentElement);
    }, 300);    // wait to complete transition
}


_("#upload_form_toggle_btn").onclick = e => {         // upload form modeal btn
    e.preventDefault();
    if (_("#upload_file_form").style.top == '12vh') {
        _("#upload_file_form").style.top = '-100vh';
        // files_menu.removeEventListener('click', upload_model_disable)

    } else {
        _("#upload_file_form").style.top = '12vh';

        setTimeout(() => {      // to prevent instant click

            _("#files_menu").addEventListener('click', upload_model_disable);
        }, 1000);
    }
}

function upload_model_disable(e) {                  // close upload form model
    e.preventDefault();
    // console.log('clicked')       // testing
    _("#upload_file_form").style.top = '-100vh';
    _("#files_menu").removeEventListener('click', upload_model_disable);
}


upload_file_form.lastElementChild.onclick = e => {      // upload Btn
    e.preventDefault();
    Object.keys(fileObjList).forEach(e => {

        let tempFormdata = new FormData();
        tempFormdata.append("files[]", fileObjList[e]);
        tempFormdata.append("fileName", _(`#fileNameID${e}`).value);
        tempFormdata.append("playlistName", _(`#playListNameId`).value);





        uploadFileFunc(tempFormdata, e, _(`#fileNameID${e}`).value)
    })
};

function uploadFileFunc(file_data_attribute, num, fileName) {
    if (upload_file_form.children[2].value != '') {


        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'php/upload.php', true);


        _(`#fileID${num}`).classList.remove("uploadingFile");
        _(`#fileID${num}`).classList.add("uploadingStarted");

        xhr.upload.onprogress = e => {       // update progress bar 

            let percentage = (e.loaded / e.total) * 100;        // percentage of file uploaded

            // console.log(percentage);
            // console.log(e.loaded);
            // console.log(e.total);
            _(`#fileID${num}`).setAttribute("style", `--processed-width:${percentage}%`)

            let fileSize = e.loaded / 1000;

            if (fileSize > 1000) {    // if file size is in MBs
                fileSize = `${(fileSize / 1000).toFixed(2)}MB`
            } else {
                fileSize = `${(fileSize).toFixed(2)}KB`

            }

            _(`#fileID${num}`).innerHTML = `
            

                <div class="details">

                    <h3>${fileName}</h3>
                </div>
                <div class="progressBarDiv">
                    <p class="processedSize">${fileSize}</p>
                    <div class="progressBar">
                        <div class="progressBarSlider"></div>
                    </div>
                    <p class="processedPercentage">${(percentage).toFixed(1)}%</p>

                </div>

            `;




        };

        xhr.onload = () => {
            if (xhr.status == 200) {




                _(`#fileID${num}`).style.scale = 0;     // small down transition

                setTimeout(() => {

                    _("#filesList").removeChild(_(`#fileID${num}`));
                }, 300);
                delete fileObjList[num];



                toast_message_func(xhr.response);



            }
        }


        xhr.send(file_data_attribute);          // must send data after defining other functions line onprogress , onload, etc;
        // console.log(file_data_attribute);   // testing

    }
    else {
        toast_message_func("Enter file first then Upload")
    }

}
