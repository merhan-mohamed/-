//Explore button//
let ExploreBtn = document.querySelector('.title .btn')
    HadithSection = document.querySelector('.Hadith');
ExploreBtn.addEventListener('click', ()=>{
  HadithSection.scrollIntoView({
    behavior : 'smooth'
  })
})


//Header//
let fixedNav = document.querySelector('.header'),
    scrollBtn = document.querySelector('.scrollBtn');
window.addEventListener('scroll',()=>{
  window.scrollY > 100 ? fixedNav.classList.add('active') :
  fixedNav.classList.remove('active');
  window.scrollY > 500 ? scrollBtn.classList.add('active'): scrollBtn.classList.remove('active')
})
scrollBtn.addEventListener('click',()=>{
  window.scrollTo({
    top:0,
    behavior:'smooth'
  })
})
//End Header//


//hadith Changer
let HadithContainer = document.querySelector('.HadithContainer'),
    next = document.querySelector('.buttons .next'),
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number');
    hadithIndex = 0;
HadithChanger()
function HadithChanger()
{
  fetch('https://api.hadith.sutanlab.id/books/muslim?range=1-300')
  .then(response => response.json())
  .then(data => {
    let Hadiths = data.data.hadiths
    ChangeHadith()

    next.addEventListener('click',() => {
      hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
      ChangeHadith()
    })

    prev.addEventListener('click',() => {
      hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
      ChangeHadith()
    })

    function ChangeHadith()
    {
        HadithContainer.innerText =  Hadiths[hadithIndex].arab;
        number.innerText = `300 - ${hadithIndex + 1}`
    }
  })
}
//End Hadith Changer

//lectures//
let Sections = document.querySelectorAll('section'),
    links = document.querySelectorAll('.header ul li');
links.forEach(link => {
  link.addEventListener('click', ()=>
  {
      document.querySelector('.header ul li.active').classList.remove('active');
      link.classList.add('active');
      let target = link.dataset.filter;
      Sections.forEach(section => {
        if(section.classList.contains(target))
        {
          section.scrollIntoView({
            behavior: 'smooth'
          })
        }
})
  })
})
//End lectures
//Quran Section
let SurahsContainer = document.querySelector('.surahsContainer');
getsurah()
function getsurah()
{
  fetch('http://api.alquran.cloud/v1/meta')
  .then(response => response.json())
  .then(data =>{
    console.log(data)
    let surahs = data.data.surahs.references;
    let numberOfsurahs = 114;
    SurahsContainer.innerHTML = ''
    for (let i = 0; i < numberOfsurahs; i++) {
      SurahsContainer.innerHTML +=
      `
      <div class="surah">
        <p>
          ${surahs[i].name}
        </p>
        <p>
          ${surahs[i].englishName}
        </p>
      </div>

      `
    }

    let surahsTitles = document.querySelectorAll('.surah')
        popup = document.querySelector('.Surah-PopUp')
        ayatContainer = document.querySelector('.ayat')
  surahsTitles.forEach((item, i) => {
    item.addEventListener('click',()=>{
      fetch(`http://api.alquran.cloud/v1/surah/${i+1}`)
      .then(response => response.json())
      .then(data => {
          ayatContainer.innerHTML = '';
          let ayat = data.data.ayahs;
          ayat.forEach(aya => {
            popup.classList.add('active');
            ayatContainer.innerHTML += `
              <p> (${aya.numberInSurah}) - (${aya.text}) </p>
              `
          })
      })
    })
  })
  let closepopup = document.querySelector('.close-PopUp');
  closepopup.addEventListener('click', ()=>{
    popup.classList.remove('active');
  })
  })
}
//praytime Api //
let cards = document.querySelector('.cards');
getPrayerTimes();
function getPrayerTimes()
{
  fetch('http://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=8')
  .then(response => response.json())
  .then(data => {
    let times = data.data.timings;
      cards.innerHTML = '';
    for(let time in times)
    {
      cards.innerHTML +=
      `
          <div class="card">
            <div class="circle">
              <svg>
                <circle  cx='100' cy='100' r='100'></circle>
              </svg>
              <div class="praytime">${times[time]}</div>
            </div>
            <p>${time}</p>
          </div>
      `
    }
  })
}
//END praytime //
let bars = document.querySelector('.bars'),
    sidebar = document.querySelector('.header ul')
bars.addEventListener('click',()=>{
  sidebar.classList.toggle('active')
})
