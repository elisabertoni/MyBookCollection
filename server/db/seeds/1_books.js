exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('books')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        { id: 1, title: 'The Catcher in the Rye', author: 'J.D.Salinger'},
        { id: 2, title: 'It Ends with Us', author: 'Colleen Hoover'},
        { id: 3, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K.Rowling'},
        { id: 4, title: 'The Lion, the Witch, and the Wardrobe', author: 'C.S. Lewis'},
        { id: 5, title: 'Normal People', author: 'Sally Rooney'},
        { id: 6, title: 'The Duke and I', author: 'Julia Quinn'},
        { id: 7, title: 'Girls That Invest', author: 'Simran Kaur'},
        { id: 8, title: 'My Darling Lemon Thyme: Every Day', author: 'Emma Galloway'},
        { id: 9, title: 'Search Inside Yourself', author: ' Chade-Meng Ta'},
        { id: 10, title: 'Homegrown Kitchen: Everyday Recipes for Eating Well', author: 'Nicola Galloway'},
        { id: 11, title: 'Healthy Baking: Nourishing breads, wholesome cakes, ancient grains and bubbling ferments', author: 'Jordan Bourke'}
      ])
    })
}
