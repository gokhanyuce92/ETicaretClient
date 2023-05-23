#her docker imajı bir başka imajdan miras almak zorundadır.
#bizde burada npm in gerekliliği olan node'un dockerHub daki imajından miras aldık.
FROM node:20.1.0

#çalışma klasörünün /app olarak belirtiyoruz.
#bu komut bizim için bu imaj çalıştığında oluşacak container içinde /app adında bir klasör oluşturacak.
WORKDIR /app

#burada projemiz içinde node_modules'ü container içindeki /app klasörüne mapliyoruz.
ENV PATH /app/node_modules/.bin:$PATH

#projemizdeki package.json dosyasını container içine kopyalıyoruz.
COPY package.json /app/package.json

#package.json içerisindeki paketlerin container'a yüklüyoruz.
RUN npm install --legacy-peer-deps

#container'a angular/cli ı general olarak kuruyoruz.
RUN npm install -g @angular/cli@16.0.1 --unsafe

#proje dosyalarını container içine kopyalıyoruz. --.dockerignore dakiler hariç
COPY . /app

#container içerisinde projemizi serve ediyoruz.
CMD ng serve --host 0.0.0.0