import ObjectsToCsv from "objects-to-csv";
import pdfMake from "pdfmake";
import customVfs from '@/assets/fonts/vfs_fonts'

export default {

    async convert(lexemes, name) {


        const csv = new ObjectsToCsv(lexemes.map(val => this.format(val)));
        //csv.toDisk('./test.csv');

        const hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(await csv.toString());
        hiddenElement.target = '_blank';
        hiddenElement.download = name + '.csv';
        hiddenElement.click();


    },
    format(obj) {
        const newObj = {};
        newObj.dialectWord = obj.dialectWord
        newObj.word = obj.word
        newObj.description = obj.description
        newObj.kind = obj.kind
        newObj.genus = obj.genus

        newObj.pronunciations = obj.pronunciations.map(val => val.pronunciation).join(',')
        newObj.examples = obj.examples.map(val => val.example).join(',')

        newObj.categories = obj.categories.map(val => val.category).join(',')
        newObj.etymologies = obj.etymologies.map(val => val.etymology).join(',')
        newObj.variety = obj.variety
        newObj.origin = obj.origin?.name
        newObj.latitude = obj.origin?.latitude
        newObj.longitude = obj.origin?.longitude

        newObj.source = obj.source

        return newObj
    },

    toPdf(lexemes, name, description, author) {


        var fonts = {
            Roboto: {
                normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
                bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
                italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
                bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
            },
            Newsreader: {
                normal: 'Newsreader_Regular.ttf',
                bold: 'Newsreader_Bold.ttf',
                italics: 'Newsreader_Italic.ttf',
            }
        };

        var docDefinition = {
            info: {
                title: name,
            },
            header: {
                text: '',
                margin: [20, 20]
            },
            defaultStyle: {
                font: 'Newsreader'
            },
            content: [],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                    lineHeight: 2,
                },
                lead: {
                    leadingIndent: -20,
                    margin: [20, 0, 0, 0]
                }
            },
            pageMargins: [100, 70],
        }


        if (author != null
        )
            docDefinition.header.text = author

        docDefinition.content.push({text: name, style: "header"})
        if (description != null)
            docDefinition.content.push({text: description, lineHeight: 2.5})
        lexemes = [...lexemes].sort((a,b) => a.dialectWord.localeCompare(b.dialectWord));
        lexemes.forEach(lexeme => {
            var line = []
            //  let line = `<p style="text-indent: -2em; margin-left: 2em;"><span><b>${lexeme.dialectWord} </b></span>`
            line.push({text: lexeme.dialectWord, bold: true})

            if (lexeme.word)
                line.push(` - ${lexeme.word}`)


            if (lexeme.kind == 'N') {
                if (lexeme.genus == "M")
                    line.push(`, der`)
                if (lexeme.genus == "F")
                    line.push(`, die`)
                if (lexeme.genus == "N")
                    line.push(`, das`)
            }

            line.push("; ")
            if (lexeme.description)
                line.push(` ${lexeme.description},`)

            if (lexeme.variety)
                line.push(` (${lexeme.variety}),`)

            if (lexeme.origin?.name)
                line.push(` verwendet in ${lexeme.origin.name},`)


            lexeme.examples.forEach(example => {
                //check if example ends with '.' or ';'
                var ending = /[.!?;]$/.test(example.example) ? "" : ";"
                line.push({text: " " + example.example + ending, italics: true})
            })

            if (lexeme.etymologies != null & lexeme.etymologies.length != 0)
                line.push(" Etymologie:")
            lexeme.etymologies.forEach(etymology => {
                //check if etymology ends with '.' or ';'
                var ending = /[.!?;]$/.test(etymology.etymology) ? "" : ";"
                line.push({text: " " + etymology.etymology + ending})
            })

            docDefinition.content.push({text: line, style: 'lead', lineHeight: 1.5,})
        })


        pdfMake.vfs = customVfs.pdfMake.vfs
        pdfMake.fonts = fonts
        pdfMake.createPdf(docDefinition).download(name);

    }
}


