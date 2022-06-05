import {Injectable} from '@angular/core';
import {FbCreateResponse} from "../entities/IFirebase";
import {Question} from "../entities/Question";
import {catchError, map, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {QuestionCategory} from "../enums/QuestionCategory";
import {Test} from "../entities/Test";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  URL: string = environment.firebaseDbUrl;

  constructor(private http: HttpClient) {
  }

  findAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.URL}/tests.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
          }))
      }));
  }

  createOrUpdateTest(test: Test): Observable<Test> {
    if (test.id) {
      return this.updateTest(test);
    } else {
      return this.http.post<FbCreateResponse>(`${this.URL}/tests.json`, this.testToDto(test))
        .pipe(map((response: FbCreateResponse) => {
          return {
            ...test,
            id: response.name,
          }
        }));
    }
  }

  updateTest(test: Test): Observable<Test> {
    return this.http.patch<Test>(`${this.URL}/tests/${test.id}.json`, this.testToDto(test))
  }

  deleteTest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/tests/${id}.json`)
  }

  testToDto(test: Test) {
    return {
      ...test,
      questions: test.questions.map(question => question.id)
    }
  }

  // findAll(): Observable<Question[] | Error> {
  //   return this.http.get<Question[]>(`${URL}/questions.json`)
  //     .pipe(catchError(this.handleError));
  // }

  findAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.URL}/questions.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            category: QuestionCategory.findByName(response[key]?.['category'])
          }))
      }));
  }

  findQuestionById(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.URL}/questions/${id}.json`)
      .pipe(map((question: Question) => {
        return {
          ...question, id
        }
      }))
  }

  createOrUpdateQuestion(question: Question): Observable<Question> {
    if (question.id) {
      return this.updateQuestion(question);
    } else {
      return this.http.post<FbCreateResponse>(`${this.URL}/questions.json`, question)
        .pipe(map((response: FbCreateResponse) => {
          return {
            ...question,
            id: response.name,
          }
        }));
    }
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.patch<Question>(`${this.URL}/questions/${question.id}.json`, question)
  }

  deleteQuestion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/questions/${id}.json`)
  }

  protected handleError(error: HttpErrorResponse): Observable<Error> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Произошла ошибка. Обратитесь к администратору системы'));
  }
}
