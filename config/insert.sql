insert into user values(DEFAULT , "1002237446564958", "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13001039_876663422455695_2534326839987696276_n.jpg?oh=376c676761df7ed408fb78c1c232d60c&oe=58A1DBB4", "이경륜", "false");
insert into user values(DEFAULT, "1002237446564959", "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13001039_876663422455695_2534326839987696276_n.jpg?oh=376c676761df7ed408fb78c1c232d60c&oe=58A1DBB4", "테스트", "false");

insert into book values (DEFAULT,'8931448287', '9788931448283', '&lt;b&gt;Java&lt;/b&gt; Programming Basic', '신용권', '『이것이 자바다』은 15년 이상 자바 언어를 교육해온 자바 전문강사의 노하우를 아낌 없이 담아낸 자바 입문서이다. 자바 입문자를 배려한 친절한 설명과 배려로 1장에 풀인원 설치...', '한빛미디어', 'https://t1.search.daumcdn.net/thumb/R110x160/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fbook%2FKOR9788968481475%3Fmoddttm=20161025060331');
insert into book values (DEFAULT,'8931448287', '9788931448283', '&lt;b&gt;Java&lt;/b&gt; Programming Basic', '가나다', '낸 자바 입문서이다. 자바 입문자를 배려한 친절한 설명과 배려로 1장에 풀인원 설치...', '한빛미디어', 'https://t1.search.daumcdn.net/thumb/R110x160/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fbook%2FKOR9788968481475%3Fmoddttm=20161025060331');

insert into user_has_book values(DEFAULT, 1, 1, "false");
insert into user_has_book values(DEFAULT, 1, 2, "false");
insert into user_has_book values(DEFAULT, 2, 1, "false");
insert into user_has_book values(DEFAULT, 2, 2, "false");