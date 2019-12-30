const ArticleList = ({ location }) => {
    const qsParams = qs.parse(location.search);
    let authorID, topicID, orderBy, order;
    if (qsParams.authorID) {
        authorID = parseInt(qsParams.authorID);
        if (isNaN(authorID)) {
            return <NotFound />;
        }
    }
    if (qsParams.topicID) {
        topicID = parseInt(qsParams.topicID);
        if (isNaN(topicID)) {
            return <NotFound />;
        }
    }
    orderBy = qsParams.orderBy || 'publishDate';
    if (!['title', 'author', 'topic', 'publishDate'].includes(orderBy)) {
        return <NotFound />;
    }
    order = qsParams.order || 'desc';
    if (!['asc', 'desc',].includes(order)) {
        return <NotFound />;
  }
}
export default ArticleList;