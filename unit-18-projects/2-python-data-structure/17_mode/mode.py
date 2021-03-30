def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    counter = {}

    for num in nums:
        counter[num] = counter.get(num, 0) + 1

    max_count = max(counter.values())

    for (num, most_common) in counter.items():
        if most_common == max_count:
            return num