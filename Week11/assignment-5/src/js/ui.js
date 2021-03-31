// Add the text to the <span>...<span> element in the element with id=table-title
function updateTableTitle(title) {
  var tableTitle = document.querySelector("#table-title");
  while (tableTitle.firstChild) {
    tableTitle.removeChild(tableTitle.firstChild);
  }
  var textNode = document.createTextNode(title);
  tableTitle.appendChild(textNode);
}

// Add the given <tr>...</tr> element to the table body element with id=rows
function addRowToTable(row) {
  var rows = document.querySelector("#rows");
  rows.appendChild(row);
}

// Remove all content from the table body element with id=rows
function clearAllTableRows() {
  var rows = document.querySelector("#rows");
  while (rows.firstChild) {
    rows.removeChild(rows.firstChild);
  }
}

// Creates and returns new table row <tr> element with the specified id value.
function createTableRow(id) {
  var tr = document.createElement("tr");
  tr.setAttribute("id", id);
  return tr;
}

// Given a child element, create a <td> and add this child to it. Return the <td>.
function createTableCell(child) {
  var td = document.createElement("td");
  td.appendChild(child);
  return td;
}

// Wraps a child element in a <td>...</td> and adds it to the table row
function addContentToRow(child, row) {
  var td = document.createElement("td");
  td.appendChild(child);
  row.appendChild(td);
}

// Given a URL src string and alt text string, create an <img> element and return:
// <img src="https://static.inaturalist.org/photos/109319291/square.jpg?1609877680" alt="Muskrat">
function createImg(src, alt) {
  var img = document.createElement("img");
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);
  return img;
}

// Given a string of text, create and return a TextNode
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode
function createText(text) {
  return document.createTextNode(text);
}

// create and return an anchor element.
// <a href="http://en.wikipedia.org/wiki/Muskrat">Muskrat</a>.  NOTE:
// The innerContent will be a TextNode or HTML Img Element (i.e., it
// won't be simple text).
function createAnchor(href, innerContent) {
  var a = document.createElement("a");
  a.setAttribute("href", href);
  a.appendChild(innerContent);
  return a;
}

// Return a proper time element with its dateTime property set:
// <time datetime="2020-09-18">2020-09-18</time>
function createTime(formatted) {
  var time = document.createElement("time");
  time.setAttribute("datetime", formatted);
  var text = document.createTextNode(formatted);
  time.appendChild(text);
  return time;
}

// Given a boolean value (true/false) return a string "Yes" or "No"
function toYesNo(value) {
  if (value) {
    value = "Yes";
  } else {
    value = "No";
  }
  return value;
}

// Converts an Observation object into DOM nodes that produce the following HTML:
//
//  <tr id="67868131">
//    <td>
//      <a href="https://www.inaturalist.org/observations/67868131">
//        <img
//          src="https://static.inaturalist.org/photos/109319291/square.jpg?1609877680"
//          alt="Muskrat">
//      </a>
//    </td>
//    <td>
//      <time datetime="2020-09-18">2020-09-18</time>
//    </td>
//    <td>
//      <a href="http://en.wikipedia.org/wiki/Muskrat">Muskrat</a>
//    </td>
//    <td>No</td>
//    <td>Yes</td>
//    <td>No</td>
//    <td>No</td>
//  </tr>
//
// Things to note in your solution:
//
// - Give the table row an id, using the observation's id
// - Create an anchor so you can click the photo and go to the observation's uri
// - Use the observation's name as the alt text of the image, and photoUrl as its src
// - Use a proper <time> element, and format the observation's date using a locale aware format, see
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
// - Use the observation's wikipediaUrl to provide a link when you click the name
// - Convert all the boolean values for endangered, native, threatened, introduced to "Yes" or "No" strings
function buildRowForObservation(observation) {
  // 1. Create the row for this observation with correct id: <tr id="67868131">...</tr>
  const row = createTableRow(observation.id);

  // 2. Create the photo, make it a link to the observation page, and put it in the first cell
  // <img src="https://static.inaturalist.org/photos/109762131/square.jpg?1610308133">
  // complete the code to create an img element using the other functions
  // in this file, and assign the return value to photo.
  const imgUrl = observation.photoUrl;
  const photo = createImg(imgUrl, observation.name);

  //3. <a href="https://www.inaturalist.org/observations/67868131">...</a>
  const observationLink = createAnchor(observation.uri, photo);
  // <td>...</td>
  addContentToRow(observationLink, row);

  // 4. Create the date and put in the second cell
  const time = createTime(observation.date.toISOString().split("T")[0]); // .toLocaleDateString()
  addContentToRow(time, row);

  // 5. Create the name with a link to its Wikipedia page in the third cell
  const name = createText(observation.name);
  const wikipediaLink = createAnchor(observation.wikipediaUrl, name);
  addContentToRow(wikipediaLink, row);

  // 4-9. Create a Yes/No text cell for each of the characteristics in the array
  ["isEndangered", "isNative", "isThreatened", "isIntroduced"].forEach(
    (characteristic) => {
      const yesNoText = toYesNo(observation[characteristic]);
      const yesNoNode = createText(yesNoText);
      addContentToRow(yesNoNode, row);
    }
  );

  // 10. replace this with a return of the fully built row for this observation
  return row;
}

// *******************************************************
// new card functions start here
// *******************************************************

/* 
<div class="card" id="60706122">
  card-img
  card-body
  card-icons
</div>
*/
function buildCardForObservation(observation) {
  var div = document.createElement('div');
  div.setAttribute('class', 'card');
  div.setAttribute('id', '60706122');
  var img = cardImg(url);
  var body = cardBody(name, date, uri, wikipediaUrl);
  var icons = cardIcons(isNative, isIntroduced, isThreatened, isEndangered);
  div.appendChild(img);
  div.appendChild(body);
  div.appendChild(icons);
}

/*
<div
 class="card-img"
 style="background-image: url(background-image:,
  url(‘https://inaturalist-opendata.s3.amazonaws.com/photos/10177220/medium.jpg?1545693877’);">
</div>
*/
function cardImg(url) {
  var div = document.createElement('div');
  div.setAttribute('class', 'card-img');
  const styleValue = `background-image: url(background-image:,url(‘${url}’);`;
  div.setAttribute('style', styleValue);
  return div;
}

/* 
<div class="card-body">
 <h3>
  <a href="https://en.wikipedia.org/wiki/Campsis_radicans">American Trumpet Vine</a>
 </h3>
 <h4>
  <a href="https://www.inaturalist.org/observations/60706122">9/25/2020</a>
 </h4>
</div>
*/
function cardBody(name, date, uri, wikipediaUrl) {
  var div = document.createElement('div');
  div.setAttribute('class', 'card-body');
  var h3 = document.createElement('h3');
  var firstA = document.createElement('a');
  firstA.setAttribute('href', wikipediaUrl);
  var textName = document.createTextNode(name);
  var h4 = document.createElement('h4');
  var secondA = document.createElement('a');
  secondA.setAttribute('href', uri);
  var textDate = document.createTextNode(date);
  firstA.appendChild(textName);
  secondA.appendChild(textDate);
  h3.appendChild(firstA);
  h4.appendChild(secondA);
  div.appendChild(h3);
  div.appendChild(h4);
  return div;
}

/*
<div class="card-icons">
 <i class="fas fa-leaf" title="Native"></i>
 <i class="fas fa-radiation-alt" title="Threatened"></i>
</div>
*/
function cardIcons(isNative, isIntroduced, isThreatened, isEndangered){
  var div = document.createElement('div');
  var i = document.createElement('i');
  if(isNative){
  i.setAttribute('class', 'fas fa-leaf');
  i.setAttribute('title', isNative);
  }
  else if(isIntroduced){
    i.setAttribute('class', 'fas fa-frog');
    i.setAttribute('title', isIntroduced);
  }
  else if(isThreatened){
    i.setAttribute('class', 'fas fa-radiation-alt');
    i.setAttribute('title', isThreatened);
  }
  else if(isEndangered){
    i.setAttribute('class', 'fas fa-skull-crossbones');
    i.setAttribute('title', isEndangered);
  }
  div.appendChild(i);
}