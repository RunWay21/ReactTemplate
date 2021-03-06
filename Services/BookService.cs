﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using Models;
using Services.Extensions;
using Services.Filters;

namespace Services
{
    public interface IBookService
    {
        Page<BookModel> GetBooks(CommonFilter filter);
        BookModel GetBook(int id);
        void SaveBook(BookModel model);

        int GetCounter();
    }

    public class BookService : IBookService, IDisposable
    {
        private static int _counter;

        private readonly int _pageSize = 15;

        #region Data
        private readonly List<BookModel> _db = new List<BookModel>
        {
            new BookModel
            {
                Id = 1,
                Author = "Rafael Simion",
                Description =
                    "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
                ISBN = "752276898-5",
                Title = "Fiddleleaf",
                Date = new DateTime(2013, 10, 21)
            },
            new BookModel
            {
                Id = 2,
                Author = "Archibald Asey",
                Description =
                    "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
                ISBN = "705145131-6",
                Title = "European Bellflower",
                Date = new DateTime(2012, 09, 30)
            },
            new BookModel
            {
                Id = 3,
                Author = "Melesa Simmonett",
                Description = "Fusce consequat. Nulla nisl. Nunc nisl.",
                ISBN = "159958759-9",
                Title = "Grove Bluegrass",
                Date = new DateTime(2017, 09, 13)
            },
            new BookModel
            {
                Id = 4,
                Author = "Bryant Deverick",
                Description =
                    "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
                ISBN = "816520926-4",
                Title = "Solidstem Burnet Saxifrage",
                Date = new DateTime(2011, 10, 07)
            },
            new BookModel
            {
                Id = 5,
                Author = "Anna Kikke",
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
                ISBN = "414969605-5",
                Title = "Pyrenocollema Lichen",
                Date = new DateTime(2011, 12, 18)
            },
            new BookModel
            {
                Id = 6,
                Author = "Clarisse Style",
                Description =
                    "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
                ISBN = "850810036-1",
                Title = "Yellowspike Orchid",
                Date = new DateTime(2013, 05, 06)
            },
            new BookModel
            {
                Id = 7,
                Author = "Jonie Farnie",
                Description =
                    "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
                ISBN = "414024676-6",
                Title = "Fringed Lichen",
                Date = new DateTime(2017, 06, 24)
            },
            new BookModel
            {
                Id = 8,
                Author = "Wilton Bittleson",
                Description =
                    "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                ISBN = "602211006-8",
                Title = "Mexican Star",
                Date = new DateTime(2014, 12, 19)
            },
            new BookModel
            {
                Id = 9,
                Author = "Tome Winsom",
                Description =
                    "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
                ISBN = "013390057-6",
                Title = "Rock Creek Broomrape",
                Date = new DateTime(2011, 04, 04)
            },
            new BookModel
            {
                Id = 10,
                Author = "Elwood Falloon",
                Description =
                    "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
                ISBN = "589803671-7",
                Title = "Silvery Lupine",
                Date = new DateTime(2011, 07, 30)
            },
            new BookModel
            {
                Id = 11,
                Author = "Rasia Lerigo",
                Description =
                    "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
                ISBN = "203815031-1",
                Title = "Fringed Spineflower",
                Date = new DateTime(2017, 02, 25)
            },
            new BookModel
            {
                Id = 12,
                Author = "Celina Tither",
                Description = "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
                ISBN = "041431915-X",
                Title = "Lewis' Clarkia",
                Date = new DateTime(2013, 01, 15)
            },
            new BookModel
            {
                Id = 13,
                Author = "Berky Willmetts",
                Description =
                    "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
                ISBN = "703985132-6",
                Title = "Mustard",
                Date = new DateTime(2017, 01, 24)
            },
            new BookModel
            {
                Id = 14,
                Author = "Cyndi Cullon",
                Description = "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
                ISBN = "311427193-6",
                Title = "Cobb Mountain Lupine",
                Date = new DateTime(2014, 10, 03)
            },
            new BookModel
            {
                Id = 15,
                Author = "Dieter Harrigan",
                Description =
                    "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
                ISBN = "678352060-9",
                Title = "Sand Pygmyweed",
                Date = new DateTime(2014, 02, 11)
            },
            new BookModel
            {
                Id = 16,
                Author = "Darrick Reyburn",
                Description = "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
                ISBN = "191659482-4",
                Title = "Mother Of Thousands",
                Date = new DateTime(2015, 01, 05)
            },
            new BookModel
            {
                Id = 17,
                Author = "Jarib Wrate",
                Description = "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
                ISBN = "128341518-6",
                Title = "Heppia Lichen",
                Date = new DateTime(2015, 09, 22)
            },
            new BookModel
            {
                Id = 18,
                Author = "Ellyn Westwell",
                Description =
                    "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
                ISBN = "449601905-1",
                Title = "Fringed Rue",
                Date = new DateTime(2016, 11, 13)
            },
            new BookModel
            {
                Id = 19,
                Author = "Kalinda Oldland",
                Description =
                    "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
                ISBN = "401774648-9",
                Title = "Limestone Snakevine",
                Date = new DateTime(2017, 01, 10)
            },
            new BookModel
            {
                Id = 20,
                Author = "Ronald Cardon",
                Description = "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
                ISBN = "891109205-3",
                Title = "Carolina Orange Lichen",
                Date = new DateTime(2017, 05, 11)
            },
            new BookModel
            {
                Id = 21,
                Author = "Paolo Reichartz",
                Description =
                    "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
                ISBN = "233137190-3",
                Title = "Bulbous Adderstongue",
                Date = new DateTime(2013, 10, 31)
            },
            new BookModel
            {
                Id = 22,
                Author = "Cayla Germain",
                Description =
                    "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
                ISBN = "499685653-X",
                Title = "Poorman's Umbrella",
                Date = new DateTime(2015, 03, 15)
            },
            new BookModel
            {
                Id = 23,
                Author = "Bret Coultas",
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
                ISBN = "963678307-1",
                Title = "Guatemalan Fir",
                Date = new DateTime(2014, 07, 19)
            },
            new BookModel
            {
                Id = 24,
                Author = "Torie Franzen",
                Description =
                    "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
                ISBN = "425124766-3",
                Title = "Shiny Goldenrod",
                Date = new DateTime(2016, 10, 04)
            },
            new BookModel
            {
                Id = 25,
                Author = "Nealy Luttgert",
                Description = "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
                ISBN = "951359669-9",
                Title = "Velvetleaf Indian Mallow",
                Date = new DateTime(2017, 05, 12)
            },
            new BookModel
            {
                Id = 26,
                Author = "Dalia Gabbidon",
                Description = "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
                ISBN = "824144291-2",
                Title = "False Tungoiltree",
                Date = new DateTime(2012, 09, 17)
            },
            new BookModel
            {
                Id = 27,
                Author = "Dulce Langeren",
                Description = "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
                ISBN = "225771344-3",
                Title = "Baccaurea",
                Date = new DateTime(2015, 11, 02)
            },
            new BookModel
            {
                Id = 28,
                Author = "Madelin Switland",
                Description =
                    "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
                ISBN = "888592118-3",
                Title = "Bartram's Ixia",
                Date = new DateTime(2013, 08, 18)
            },
            new BookModel
            {
                Id = 29,
                Author = "Gretna Hibling",
                Description = "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
                ISBN = "493588792-3",
                Title = "Palaquium",
                Date = new DateTime(2011, 04, 13)
            },
            new BookModel
            {
                Id = 30,
                Author = "Hillier Coard",
                Description = "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
                ISBN = "035042919-7",
                Title = "Dog's-tongue",
                Date = new DateTime(2012, 04, 15)
            },
            new BookModel
            {
                Id = 31,
                Author = "Aaren Harnett",
                Description = "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
                ISBN = "660063328-X",
                Title = "Silvery Sedge",
                Date = new DateTime(2014, 06, 01)
            },
            new BookModel
            {
                Id = 32,
                Author = "Christina Grigoliis",
                Description =
                    "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
                ISBN = "573644111-X",
                Title = "Hupeh Cotoneaster",
                Date = new DateTime(2012, 04, 09)
            },
            new BookModel
            {
                Id = 33,
                Author = "Brad Jeffryes",
                Description =
                    "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
                ISBN = "224967936-3",
                Title = "Firecracker Penstemon",
                Date = new DateTime(2011, 02, 16)
            },
            new BookModel
            {
                Id = 34,
                Author = "Patton Iacobo",
                Description = "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
                ISBN = "926046245-2",
                Title = "Missouri Orange Coneflower",
                Date = new DateTime(2015, 06, 22)
            },
            new BookModel
            {
                Id = 35,
                Author = "Dorie Choppen",
                Description =
                    "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
                ISBN = "825339977-4",
                Title = "Arisaema",
                Date = new DateTime(2011, 03, 08)
            },
            new BookModel
            {
                Id = 36,
                Author = "Katrinka Meller",
                Description =
                    "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
                ISBN = "646216446-8",
                Title = "Bouncingbet",
                Date = new DateTime(2014, 02, 15)
            },
            new BookModel
            {
                Id = 37,
                Author = "Patti Mancer",
                Description = "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
                ISBN = "791477707-2",
                Title = "Fiestaflower",
                Date = new DateTime(2012, 06, 04)
            },
            new BookModel
            {
                Id = 38,
                Author = "Wynne Beers",
                Description =
                    "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
                ISBN = "182442436-1",
                Title = "Limestone Beardtongue",
                Date = new DateTime(2013, 06, 21)
            },
            new BookModel
            {
                Id = 39,
                Author = "Gustie Seward",
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
                ISBN = "973700430-2",
                Title = "Purdy's Stonecrop",
                Date = new DateTime(2014, 06, 11)
            },
            new BookModel
            {
                Id = 40,
                Author = "Gretna Strewther",
                Description =
                    "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
                ISBN = "102163784-X",
                Title = "Waianae Range Papala",
                Date = new DateTime(2015, 04, 25)
            },
            new BookModel
            {
                Id = 41,
                Author = "Fannie Gayler",
                Description =
                    "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
                ISBN = "385976687-2",
                Title = "Lecidea Lichen",
                Date = new DateTime(2017, 11, 18)
            },
            new BookModel
            {
                Id = 42,
                Author = "Harold Dudenie",
                Description =
                    "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
                ISBN = "371198523-8",
                Title = "Hedgenettle",
                Date = new DateTime(2011, 03, 20)
            },
            new BookModel
            {
                Id = 43,
                Author = "Marquita Doneld",
                Description = "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
                ISBN = "630532933-8",
                Title = "Chelsau",
                Date = new DateTime(2016, 07, 28)
            },
            new BookModel
            {
                Id = 44,
                Author = "Tulley Torrecilla",
                Description =
                    "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
                ISBN = "383106933-6",
                Title = "Peregrina",
                Date = new DateTime(2016, 03, 25)
            },
            new BookModel
            {
                Id = 45,
                Author = "Siouxie Grief",
                Description =
                    "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
                ISBN = "756454144-X",
                Title = "Pallid Bird's Beak",
                Date = new DateTime(2017, 11, 07)
            },
            new BookModel
            {
                Id = 46,
                Author = "Suzanne Husbands",
                Description = "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
                ISBN = "445956436-X",
                Title = "Beautybush",
                Date = new DateTime(2015, 03, 13)
            },
            new BookModel
            {
                Id = 47,
                Author = "Dareen Conduit",
                Description =
                    "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
                ISBN = "759958334-3",
                Title = "Sweetbay",
                Date = new DateTime(2016, 07, 03)
            },
            new BookModel
            {
                Id = 48,
                Author = "Thea Dryden",
                Description =
                    "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
                ISBN = "028799237-3",
                Title = "Spiked False Mannagrass",
                Date = new DateTime(2016, 01, 31)
            },
            new BookModel
            {
                Id = 49,
                Author = "Bliss Thunders",
                Description =
                    "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
                ISBN = "200550042-9",
                Title = "California Blackberry",
                Date = new DateTime(2012, 10, 14)
            },
            new BookModel
            {
                Id = 50,
                Author = "Ruthy Corragan",
                Description =
                    "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
                ISBN = "061530745-0",
                Title = "Greygreen Reindeer Lichen",
                Date = new DateTime(2011, 05, 02)
            },
            new BookModel
            {
                Id = 51,
                Author = "Lesli Fley",
                Description = "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
                ISBN = "649583623-6",
                Title = "Tomentose Burbark",
                Date = new DateTime(2012, 12, 17)
            },
            new BookModel
            {
                Id = 52,
                Author = "Duane Gianilli",
                Description = "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
                ISBN = "894013617-9",
                Title = "Chambers' Bluegrass",
                Date = new DateTime(2016, 10, 15)
            },
            new BookModel
            {
                Id = 53,
                Author = "Audrie Howick",
                Description =
                    "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
                ISBN = "927123177-5",
                Title = "Lecidea Lichen",
                Date = new DateTime(2014, 11, 05)
            },
            new BookModel
            {
                Id = 54,
                Author = "Cece Kovacs",
                Description =
                    "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
                ISBN = "977576542-0",
                Title = "Sarmenthypnum Moss",
                Date = new DateTime(2012, 12, 08)
            },
            new BookModel
            {
                Id = 55,
                Author = "Hope Gethins",
                Description =
                    "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
                ISBN = "563221539-3",
                Title = "Scotch Laburnum",
                Date = new DateTime(2015, 07, 04)
            },
            new BookModel
            {
                Id = 56,
                Author = "Rudiger Jessard",
                Description =
                    "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
                ISBN = "083486842-3",
                Title = "Scarlet Vetch",
                Date = new DateTime(2015, 03, 19)
            },
            new BookModel
            {
                Id = 57,
                Author = "Mariya Corrett",
                Description = "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
                ISBN = "157886747-9",
                Title = "Smallhead Rush",
                Date = new DateTime(2014, 06, 20)
            },
            new BookModel
            {
                Id = 58,
                Author = "Hubie Matuszinski",
                Description = "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
                ISBN = "178100286-X",
                Title = "Woollyheads",
                Date = new DateTime(2015, 12, 07)
            },
            new BookModel
            {
                Id = 59,
                Author = "Freddy Palay",
                Description =
                    "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
                ISBN = "527739576-8",
                Title = "Mertens' Rush",
                Date = new DateTime(2016, 06, 02)
            },
            new BookModel
            {
                Id = 60,
                Author = "Kory Kures",
                Description =
                    "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                ISBN = "960519138-5",
                Title = "Engelmann's Thistle",
                Date = new DateTime(2015, 04, 22)
            },
            new BookModel
            {
                Id = 61,
                Author = "Muhammad Oakwood",
                Description = "In congue. Etiam justo. Etiam pretium iaculis justo.",
                ISBN = "911539185-X",
                Title = "Hawthorn",
                Date = new DateTime(2015, 07, 25)
            },
            new BookModel
            {
                Id = 62,
                Author = "Gwenette Reedyhough",
                Description = "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
                ISBN = "939419746-X",
                Title = "Umbrella Thorn",
                Date = new DateTime(2014, 08, 24)
            },
            new BookModel
            {
                Id = 63,
                Author = "Bruce De Cruce",
                Description = "Fusce consequat. Nulla nisl. Nunc nisl.",
                ISBN = "867826245-1",
                Title = "Broom Brome",
                Date = new DateTime(2014, 04, 26)
            },
            new BookModel
            {
                Id = 64,
                Author = "Valina Greetland",
                Description =
                    "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
                ISBN = "102867994-7",
                Title = "Rinodina Lichen",
                Date = new DateTime(2014, 04, 18)
            },
            new BookModel
            {
                Id = 65,
                Author = "Brittne Duchesne",
                Description =
                    "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
                ISBN = "136515598-6",
                Title = "Fringed Lichen",
                Date = new DateTime(2015, 10, 23)
            },
            new BookModel
            {
                Id = 66,
                Author = "Ariana Weiss",
                Description = "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
                ISBN = "332899395-9",
                Title = "Smooth Pricklypoppy",
                Date = new DateTime(2015, 06, 21)
            },
            new BookModel
            {
                Id = 67,
                Author = "Harmon Paydon",
                Description =
                    "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
                ISBN = "549010932-7",
                Title = "Dwarf White Milkvetch",
                Date = new DateTime(2014, 07, 15)
            },
            new BookModel
            {
                Id = 68,
                Author = "Micaela Clowes",
                Description =
                    "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
                ISBN = "189850267-6",
                Title = "Bean",
                Date = new DateTime(2012, 10, 28)
            },
            new BookModel
            {
                Id = 69,
                Author = "Gretta Rozzell",
                Description =
                    "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
                ISBN = "289020460-X",
                Title = "White River Coraldrops",
                Date = new DateTime(2013, 05, 17)
            },
            new BookModel
            {
                Id = 70,
                Author = "Renie Coopland",
                Description = "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
                ISBN = "250332716-8",
                Title = "Blackeyed Susan Vine",
                Date = new DateTime(2016, 10, 04)
            },
            new BookModel
            {
                Id = 71,
                Author = "Cymbre Scoines",
                Description =
                    "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
                ISBN = "908295549-0",
                Title = "Elmleaf Goldenrod",
                Date = new DateTime(2011, 12, 03)
            },
            new BookModel
            {
                Id = 72,
                Author = "Gillan Wittier",
                Description =
                    "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
                ISBN = "178321612-3",
                Title = "Muttonwood",
                Date = new DateTime(2012, 10, 12)
            },
            new BookModel
            {
                Id = 73,
                Author = "Glenden Bilton",
                Description = "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
                ISBN = "640510875-9",
                Title = "Exserted Indian Paintbrush",
                Date = new DateTime(2011, 12, 12)
            },
            new BookModel
            {
                Id = 74,
                Author = "Fernando Findlow",
                Description = "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
                ISBN = "366842771-2",
                Title = "Shaggystem Cyrtandra",
                Date = new DateTime(2012, 11, 07)
            },
            new BookModel
            {
                Id = 75,
                Author = "Paddy Cogan",
                Description = "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
                ISBN = "000006384-3",
                Title = "Cusick's Milkvetch",
                Date = new DateTime(2014, 06, 23)
            },
            new BookModel
            {
                Id = 76,
                Author = "Breanne Gabbitas",
                Description = "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
                ISBN = "710968402-4",
                Title = "Husk Tomato",
                Date = new DateTime(2011, 11, 17)
            },
            new BookModel
            {
                Id = 77,
                Author = "Aloise Ellacombe",
                Description =
                    "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
                ISBN = "960242161-4",
                Title = "Watson's False Clapdaisy",
                Date = new DateTime(2013, 06, 21)
            },
            new BookModel
            {
                Id = 78,
                Author = "Mira Norcross",
                Description =
                    "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
                ISBN = "773748996-7",
                Title = "Rim Lichen",
                Date = new DateTime(2013, 09, 24)
            },
            new BookModel
            {
                Id = 79,
                Author = "Helyn Peskin",
                Description = "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
                ISBN = "006786462-7",
                Title = "Bingen Lupine",
                Date = new DateTime(2016, 11, 30)
            },
            new BookModel
            {
                Id = 80,
                Author = "Staford Enden",
                Description = "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
                ISBN = "777386314-8",
                Title = "Tacky Goldenweed",
                Date = new DateTime(2016, 11, 25)
            },
            new BookModel
            {
                Id = 81,
                Author = "Trescha Whatson",
                Description = "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
                ISBN = "418182128-5",
                Title = "Hillside False Bindweed",
                Date = new DateTime(2016, 05, 21)
            },
            new BookModel
            {
                Id = 82,
                Author = "Hayley Grattan",
                Description =
                    "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
                ISBN = "054032352-7",
                Title = "Texas Salt",
                Date = new DateTime(2017, 01, 21)
            },
            new BookModel
            {
                Id = 83,
                Author = "Valentina Bellam",
                Description =
                    "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
                ISBN = "375072359-1",
                Title = "Parry Ceanothus",
                Date = new DateTime(2012, 10, 03)
            },
            new BookModel
            {
                Id = 84,
                Author = "Claiborne Chitter",
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
                ISBN = "297950696-6",
                Title = "Twinsorus Fern",
                Date = new DateTime(2017, 09, 04)
            },
            new BookModel
            {
                Id = 85,
                Author = "Brittni Harrold",
                Description = "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
                ISBN = "233350385-8",
                Title = "Belize Sage",
                Date = new DateTime(2012, 10, 08)
            },
            new BookModel
            {
                Id = 86,
                Author = "Stormie Babb",
                Description =
                    "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                ISBN = "315116781-0",
                Title = "White Edge Sedge",
                Date = new DateTime(2011, 01, 10)
            },
            new BookModel
            {
                Id = 87,
                Author = "Trista Salaman",
                Description = "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
                ISBN = "527695952-8",
                Title = "Spreading Stickseed",
                Date = new DateTime(2012, 04, 20)
            },
            new BookModel
            {
                Id = 88,
                Author = "Hill Wormald",
                Description = "In congue. Etiam justo. Etiam pretium iaculis justo.",
                ISBN = "422876162-3",
                Title = "Littleseed Ricegrass",
                Date = new DateTime(2017, 01, 12)
            },
            new BookModel
            {
                Id = 89,
                Author = "Aldric Bjorkan",
                Description =
                    "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
                ISBN = "981784207-X",
                Title = "Aroma",
                Date = new DateTime(2017, 02, 27)
            },
            new BookModel
            {
                Id = 90,
                Author = "Tracie Stang-Gjertsen",
                Description =
                    "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
                ISBN = "139193279-X",
                Title = "Echinoplaca Lichen",
                Date = new DateTime(2013, 11, 02)
            },
            new BookModel
            {
                Id = 91,
                Author = "Phelia Minster",
                Description = "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
                ISBN = "059380469-4",
                Title = "Solorinella Lichen",
                Date = new DateTime(2016, 07, 10)
            },
            new BookModel
            {
                Id = 92,
                Author = "Alyda Yo",
                Description = "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
                ISBN = "719497059-7",
                Title = "Dixie Goldenrod",
                Date = new DateTime(2013, 10, 09)
            },
            new BookModel
            {
                Id = 93,
                Author = "Nisse Alexsandrowicz",
                Description =
                    "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
                ISBN = "481593588-2",
                Title = "Big Island Ma'oloa",
                Date = new DateTime(2013, 09, 15)
            },
            new BookModel
            {
                Id = 94,
                Author = "Ferdinand Jorgesen",
                Description =
                    "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
                ISBN = "111079807-5",
                Title = "Slender Mountain Sandwort",
                Date = new DateTime(2016, 02, 27)
            },
            new BookModel
            {
                Id = 95,
                Author = "Noble Andrzejak",
                Description =
                    "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
                ISBN = "563360616-7",
                Title = "Rough Pipewort",
                Date = new DateTime(2013, 02, 28)
            },
            new BookModel
            {
                Id = 96,
                Author = "Kipper Telega",
                Description =
                    "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
                ISBN = "715758120-5",
                Title = "Florida Keys Blackbead",
                Date = new DateTime(2011, 02, 23)
            },
            new BookModel
            {
                Id = 97,
                Author = "Thibaud Devenish",
                Description = "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
                ISBN = "896842060-2",
                Title = "Western Larch",
                Date = new DateTime(2012, 07, 11)
            },
            new BookModel
            {
                Id = 98,
                Author = "Suzann Sweedy",
                Description =
                    "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
                ISBN = "276845518-0",
                Title = "Dwarf Alpine Hawksbeard",
                Date = new DateTime(2013, 07, 05)
            },
            new BookModel
            {
                Id = 99,
                Author = "Andi Zarfai",
                Description = "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
                ISBN = "148324931-X",
                Title = "Sea Campion",
                Date = new DateTime(2013, 03, 21)
            },
            new BookModel
            {
                Id = 100,
                Author = "Hedvig Abrehart",
                Description =
                    "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
                ISBN = "031460170-8",
                Title = "Whitewhorl Lupine",
                Date = new DateTime(2012, 07, 23)
            }
        };
        #endregion

        public BookService()
        {
            _counter++;
        }

        private void Delay()
        {
            Thread.Sleep(500);
        }

        public int GetCounter()
        {
            return _counter;
        }

        public void Dispose()
        {
            _counter--;
        }


        public Page<BookModel> GetBooks(CommonFilter filter)
        {
            Delay();
            var query = _db.AsQueryable();
            if (!string.IsNullOrWhiteSpace(filter.Filters))
                query = query
                    .Filter(filter.Filters)
                    .WhereContains("author", value => model => model.Author.ToLower().Contains(value.ToLower()))
                    .WhereEquals("author", value => model => string.Equals(model.Author, value, StringComparison.CurrentCultureIgnoreCase))
                    .WhereContains("title", value => model => model.Title.ToLower().Contains(value.ToLower()))
                    .WhereEquals("title", value => model => string.Equals(model.Title, value, StringComparison.CurrentCultureIgnoreCase))
                    .Apply();
            var count = query.Count();
            query = query
                .Order(filter.OrderBy, filter.SortBy)
                .Field("author", x => x.Author, x => x.Date)
                .Field("description", x => x.Description)
                .Field("isbn", x => x.ISBN)
                .Field("date", x => x.Date)
                .Default(x => x.Title)
                .Apply();
            var items = query.Skip((filter.Page - 1) * _pageSize).Take(_pageSize).ToList();
            return new Page<BookModel>(filter.Page, _pageSize, count, items);
        }

        public BookModel GetBook(int id)
        {
            Delay();
            return _db.FirstOrDefault(x => x.Id == id);
        }

        public void SaveBook(BookModel model)
        {
            Delay();
            if (model.Id > 0)
            {
                var book = GetBook(model.Id);
                if (book == null)
                    throw new ArgumentException("Can't find book for Id " + model.Id);
                book.Author = model.Author;
                book.Title = model.Title;
                book.Description = model.Description;
                book.ISBN = model.ISBN;
                book.Date = model.Date;
            }
            else
            {
                _db.Add(new BookModel
                {
                    Id = _db.Max(x => x.Id) + 1,
                    Author = model.Author,
                    Title = model.Title,
                    Description = model.Description,
                    ISBN = model.ISBN,
                    Date = model.Date
                });
            }
        }
    }
}
