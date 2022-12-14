import { createAnnotationRegex } from "./sbol"

const trailingPunctuationRegex = /[ \.,\/#!$%\^&\*;:{}=\-_`~()]+?$/

export function hasTrailingPunctuation(text) {
    return trailingPunctuationRegex.test(text)
}

export function removeTrailingPunctuation(text) {
    const trailingLength = text.match(trailingPunctuationRegex)?.[0].length ?? 0
    return {
        text: text.replace(trailingPunctuationRegex, ""),
        length: trailingLength,
    }
}


export function splitByAnnotations(text) {
    return text.split(/(\[.*?\))/g)
}

export function splitIntoWords(text) {
    return text.split(/\s+/)
}

export function splitIntoAnnotationsAndWords(text) {

    const annotationReg = createAnnotationRegex(".+?", "")

    // separate out annotations
    return splitByAnnotations(text)
        // separate words
        .map(str => annotationReg.test(str) ?
            str :
            splitIntoWords(str)
        )
        .flat()
        // filter out empties
        .filter(str => !!str)
}
