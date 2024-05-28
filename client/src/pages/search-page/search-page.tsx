import styles from './search-page.module.css';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { UserAuthContext } from '../../lib/auth';
import Page from '../../components/Page/Page';

const SearchPage = function () {
	return (<Page content={<p>page</p>}/>)
};

export default SearchPage;
