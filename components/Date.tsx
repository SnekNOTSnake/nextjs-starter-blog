import React from 'react'
import { parseISO, format } from 'date-fns'

type Params = { dateString: string }

const Date: React.FC<Params> = ({ dateString }) => {
	const date = parseISO(dateString)
	return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export default Date
