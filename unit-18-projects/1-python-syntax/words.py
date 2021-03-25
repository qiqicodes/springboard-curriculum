def print_upper_words(words, elim_set):
    """this prints all words in uppercases from input list""" 
    for word in words:
        for char in elim_set:
            if word.startswith(char):
                print(word.upper())

print_upper_words(["fu", "boy", "love", "hike","elephant","event","olive"], {"o","f"})