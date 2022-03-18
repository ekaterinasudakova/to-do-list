let inputField = document.querySelector('.form-field')
let actualList = document.querySelector('.action-items')
let itemCounter = document.querySelector('.item-counter')
let completedItemCounter = document.querySelector('.completed-item-counter')
let labelCounter = document.querySelector('.labels')
let clearAllBtn = document.querySelector('.clear-all')
let redCount = document.querySelector('.red-amount')
let orangeCount = document.querySelector('.orange-amount')
let greenCount = document.querySelector('.green-amount')
let blueCount = document.querySelector('.blue-amount')
let purpleCount = document.querySelector('.purple-amount')

let colors = [ 'red', 'orange', 'green', 'blue', 'purple']


var items = 0
var completed = 0
itemCounter.innerHTML = items
completedItemCounter.innerHTML = completed


let createNewItem = function(){

    //creates new P with input value
    let newLi = document.createElement("li")
    let input = inputField.value
    console.log(input)
    let newP = document.createElement('p')
    let newLiTextContent = document.createTextNode(input)
    newP.appendChild(newLiTextContent)

    //completed box with image
    let newCheckbox = document.createElement("div")
    newCheckbox.classList.add('check-box')
    let imgC = document.createElement('img')
    imgC.src = "dist/img/money.png"
    newCheckbox.appendChild(imgC)

    //delete button with image
    let newDeleteBox = document.createElement('div')
    newDeleteBox.classList.add('delete-box')
    let imgD = document.createElement('img')
    imgD.src = "dist/img/delete.png"
    newDeleteBox.appendChild(imgD)


    //adds completed box, p and delete box to new LI
    newLi.appendChild(newCheckbox)
    newLi.appendChild(newP)
    newLi.appendChild(newDeleteBox)

    //inserts newLI to top of the list
    if (input === ''){
        alert("Input an action item!")
    } else {
        actualList.insertBefore(newLi, actualList.children[0])
        
    }

    //color label
    let colorLabels = function(){
        if(this.parentElement.classList.contains('completed')){
            return
        }

        color = colors.shift()
        colors.push(color)

        console.log(this.parentElement)
        

        //if LI has a class with a color, remove it
        this.parentElement.classList.remove(...colors)

        //add new color class to LI
        newLi.classList.add(color)
        
        //count how many Li have each label
        red = document.querySelectorAll('.red').length
        orange = document.querySelectorAll('.orange').length
        green = document.querySelectorAll('.green').length
        blue = document.querySelectorAll('.blue').length
        purple = document.querySelectorAll('.purple').length
        
        //update label count
        redCount.innerHTML = red
        orangeCount.innerHTML = orange
        greenCount.innerHTML = green
        blueCount.innerHTML = blue
        purpleCount.innerHTML = purple
        
    }

    
    //event listener functions
    let completedItem = function(){
        if (newCheckbox.classList.contains('checked')){
            newCheckbox.classList.remove('checked')
            newLi.classList.remove('completed')
            newP.classList.remove('checked')
            imgC.classList.remove('checked')
            updateCounter()

        } else {
            newCheckbox.classList.add('checked')
            newLi.classList.add('completed')
            newP.classList.add('checked')
            imgC.classList.add('checked')
            updateCounter()
        }
    }

    let deletedItem = function(){
        newDeleteBox.classList.add('deleted')
        newCheckbox.classList.add('deleted')
        newLi.classList.add('deleted')
        //after animation ran, remove the LI from the DOM to have 
        //accurate counts
        setTimeout(function(){
            newLi.remove()
            updateCounter() 
        },3000)   

    }

    let clearAll = function(){
        while(actualList.children.length){
            actualList.children[0].remove()
            updateCounter()
        }
    }

    let cycleLabels = function(){
        let labelColorsArray = Array.from(this.children)
        // console.log(labelColorsArray[0])


        labelColorsArray.forEach(function(labelColor){
            if(labelColor.classList.contains('visible')){
                labelColor.classList.remove('visible')
                let nextLabelColor = labelColor.nextElementSibling
                console.log(nextLabelColor)
                //This errors to cannot read properties of null
                //but console.log pulls up appropriate div
                nextLabelColor.classList.add('visible')
            }
        })
        
    }

    let updateCounter = function(){
        //find new count
        items = actualList.children.length
        completed = actualList.querySelectorAll('.completed').length
        //change the count on page
        itemCounter.innerHTML = items
        completedItemCounter.innerHTML = completed
    }

    updateCounter()

    //event listeners
    newCheckbox.addEventListener('click', completedItem)
    newDeleteBox.addEventListener('click', deletedItem)
    newP.addEventListener('click', colorLabels)
    clearAllBtn.addEventListener('click', clearAll)
    labelCounter.addEventListener('click',cycleLabels)
}

inputField.addEventListener("keydown", function(e){
    if (e.code === "Enter"){
        createNewItem()
        inputField.value = ""
    }
})


