# Calculate average loan approval time in hours\ndef average_approval_time(loans):
    total_time = 0
    count = 0
    for loan in loans:
        if 'approval_time' in loan:
            total_time += loan['approval_time']
            count += 1
    return total_time / count if count > 0 else 0